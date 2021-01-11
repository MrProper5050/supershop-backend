import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, Op } from 'sequelize';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { User } from 'src/models/user.model';
import * as shortid from 'shortid'
import * as bcrypt from 'bcrypt'
import { Goods } from 'src/models/goods.model';
import { Orders } from 'src/models/orders.model';
import { UserObject } from 'src/dto/userObject.dto';
import { Add_SubBalance } from 'src/dto/admin/add_subBalance.dto';


@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User){}

    findOneById(id: string): Promise<User> {
        try {
            return this.userModel.findOne({
                where: {
                  id
                },include:[{all:true}]
            });
        } catch (error) {
            throw new InternalServerErrorException('Cannot find user')
            
        }
       
    }
    findOneByParamsObject(params: FindOptions): Promise<User>{
        try {
            return this.userModel.findOne( params )
        } catch (error) {
            throw new BadRequestException('Cannot find user')
        }
        
    }

    async getAllUsers(): Promise<User[]>{
        return this.userModel.findAll({
            include:[{all:true}],   
        })
    }

    async createNewUser(createUserDto: CreateUserDto){
        const validated = this.password_login_validate(createUserDto)
        if(validated !== 'OK') throw new BadRequestException(validated.message)

        let {username, email, password, role} = createUserDto
        const candidate = await this.userModel.findOne({
            where:{
                [Op.or]:[{email},{username}]
            }
        })
        if(candidate) throw new BadRequestException('User with this email or nickname already exist')

        if (role !== 'seller' && role !== 'common') throw new BadRequestException('Invalid param -> role')
        

        try {
            password = await bcrypt.hash(password, 12)
            
            const user = User.build({
                id: shortid.generate(),
                username,
                email,
                password,
                role,
                balance:0
            })
            await user.save()
            return 'OK';
        } catch (e) {
            throw new InternalServerErrorException("Failure to create user")
            
        }

    }

    async createNewUser_admin(createUserDto: CreateUserDto){
        const validated = this.password_login_validate(createUserDto)
        if(validated !== 'OK') throw new BadRequestException(validated.message)

        let {username, email, password, role} = createUserDto
        const candidate = await this.userModel.findOne({
            where:{
                [Op.or]:[{email},{username}]
            }
        })
        if(candidate) throw new BadRequestException('User with this email or nickname already exist')

        if (role !== 'seller' && role !== 'common' && role !== 'admin') throw new BadRequestException('Invalid param -> role')

        try {
            password = await bcrypt.hash(password, 12)
            
            const user = User.build({
                id: shortid.generate(),
                username,
                email,
                password,
                role,
                balance:0
            })
            await user.save()
            return {message:'User successfully created', state:'OK'};
        } catch (e) {
            return {message:"Failure to create user", state:'NOK'}
        }

    }

    password_login_validate(userObj: CreateUserDto){
        const {username, email, password} = userObj
        console.log(username, email, password)
        if(typeof username === 'undefined' || typeof email === 'undefined' || typeof password === 'undefined'){
            console.log(username, email, password)
            return {state: 'NOK'}
        }
        if(userObj.password.length < 6){
            return {message: 'Min password length 6 symbols', state:'NOK'}
        }
        if(userObj.username.length < 2 || userObj.username.length > 12){
            return {message: 'Min username length 2 symbols and max length is 12 symbols', state:'NOK'}
        }
        //email validation and etc
        return 'OK'
    }
    async deleteUserById(id: string){
        const user = await this.findOneById(id)
        if(!user) throw new BadRequestException('User could not be found')
        await user.destroy()
    }
    

    async addBalance(add_SubBalance:Add_SubBalance ){
        
        //get user balance
        //add money
        let balance = (await this.findOneById(add_SubBalance.userId)).balance;
        balance += add_SubBalance.howMany
        try {
            await this.userModel.update({balance},{where:{id: add_SubBalance.userId}})
            return 'OK'
        } catch (error) {
            throw new InternalServerErrorException('Cannot update user balance')
        }
        

    }
    async subBalance(add_SubBalance:Add_SubBalance ){
        
        //get user balance
        //add money
        let balance = (await this.findOneById(add_SubBalance.userId)).balance;
        balance -= add_SubBalance.howMany
        if(balance <= 0) throw new InternalServerErrorException('User balance is less than zero or equal to zero')

        try {
            await this.userModel.update({balance},{where:{id: add_SubBalance.userId}})
            return 'OK'
        } catch (error) {
            throw new InternalServerErrorException('Cannot update user balance')
        }
        

    }
}

