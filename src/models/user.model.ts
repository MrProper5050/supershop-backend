import { BelongsTo, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Goods } from "./goods.model";

@Table({tableName:'users'})
export class User extends Model<User>{

    @PrimaryKey
    @Column(DataType.STRING)
    id: string;

    @Column
    username: string;

    @Column
    email: string;

    @Column(DataType.STRING(255))
    password: string;

    @Column
    role: string;

    @Column
    balance: number;

    @Column(DataType.ARRAY(DataType.JSON))
    purchased_goods: any

    // @BelongsTo(()=> Goods)
    // myGoods: Goods

    @CreatedAt
    @Column
    createdAt: Date;

    @UpdatedAt
    @Column
    updatedAt: Date;
}