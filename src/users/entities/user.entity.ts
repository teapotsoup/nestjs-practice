import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, Column, Entity } from "typeorm";
import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";
import { IsEmail, IsEnum } from "class-validator";

enum UserRole{
    customer,
    owner,
    delivery
}

registerEnumType(UserRole,{name:"UserRole"})


@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class User extends CoreEntity{

    @Column()
    @Field(type=>String)
    @IsEmail()
    email:string;

    @Column()
    @Field(type=>String)
    password:string;

    @Column({
        type:'enum',enum:UserRole
    })
    @Field(type=>UserRole)
    @IsEnum(UserRole)
    role:UserRole;
    //role은 customer, owner, delivery 세가지로 구성

    @BeforeInsert() //DB저장전에
    async hashPassword(): Promise<void>{
        try{
            this.password = await bcrypt.hash(this.password,10); //PASSWORD를 받아서 hash
        }catch(e){
            console.log(e);
            throw new InternalServerErrorException()
        }
    }

    async checkPassword(aPassword:string): Promise<boolean>{
        try{
            const ok = await bcrypt.compare(aPassword, this.password)
            return ok;
        }
        catch(e){
            console.log(e)
            throw new InternalServerErrorException();
        }
    }
}