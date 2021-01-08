import { AllowNull, BelongsTo, BelongsToMany, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { User } from "./user.model";

@Table({tableName:'orders'}) export class Orders extends Model<Orders>{

    @PrimaryKey
    @Column
    id: string;

    @AllowNull(false)
    @Column(DataType.JSON)
    info: any;

    @AllowNull(false)
    @Column(DataType.STRING)
    state: string;

    //USER
    @ForeignKey(() => User)
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    ownerId: any;

    @BelongsTo(() => User, 'ownerId')
    owner: User;

    @ForeignKey(() => User)
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    buyerId: any;

    @BelongsTo(() => User, 'buyerId')
    buyer: User;

    //DATE
    @CreatedAt
    @Column
    createdAt: Date;

    @UpdatedAt
    @Column
    updatedAt: Date;

  

}