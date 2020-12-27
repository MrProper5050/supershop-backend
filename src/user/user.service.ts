import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, Op } from 'sequelize';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { User } from 'src/models/user.model';
import * as shortid from 'shortid'
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User){}

    findOneById(id: string): Promise<User> {
        return this.userModel.findOne({
          where: {
            id
          }
        });
    }
    findOneByParamsObject(params: FindOptions): Promise<User>{
        return this.userModel.findOne( params )
    }

    async getAllUsers(): Promise<User[]>{
        return this.userModel.findAll()
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

        try {
            role = role || 'common'
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
            console.log(e)
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
   
}

