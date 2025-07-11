import { group } from "console";
import { Expense } from "src/expenses/entities/expense.entity";
import {  Groups } from "src/groups/entities/group.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class Category {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    categoryName:string

    @OneToMany(()=>Groups,group=>group.category)
    groups:Groups[]

    @OneToMany(()=>Expense,expense=>expense.category)
    expense:Expense;
}
