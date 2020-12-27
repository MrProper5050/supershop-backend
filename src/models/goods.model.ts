import { AllowNull, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { User } from "./user.model";

@Table({tableName:'goods'})
export class Goods extends Model<Goods>{

    @PrimaryKey
    @Column(DataType.STRING)
    id: string;

    @AllowNull(false)
    @Column
    title: string;

    @AllowNull(false)
    @Column
    category: string;

    @AllowNull(false)
    @Column(DataType.JSON)
    info: any

    @AllowNull(false)
    @Column
    price: number;

    @AllowNull(false)
    @Column
    amount: number;


    @CreatedAt
    @Column
    createdAt: Date;

    @UpdatedAt
    @Column
    updatedAt: Date;

  

}