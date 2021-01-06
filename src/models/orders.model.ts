import { AllowNull, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { User } from "./user.model";

@Table({tableName:'orders'})
export class Orders extends Model<Orders>{

    
    @PrimaryKey
    @Column
    id: string;

    @AllowNull(false)
    @Column(DataType.JSON)
    info: any;

    //USER
    @BelongsTo(() => User)
    user: User;
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    userId: any;


    //DATE
    @CreatedAt
    @Column
    createdAt: Date;

    @UpdatedAt
    @Column
    updatedAt: Date;

  

}