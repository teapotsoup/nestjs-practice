import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType({isAbstract:true}) //InputType이 스키마에 포함되길 원치 않음 확장의 의미를 가지는 abstract
@ObjectType()
@Entity()
export class Cafe{

    @PrimaryGeneratedColumn()
    @Field(type => Number) 
    id: number

    @Field(type => String) 
    @Column()
    @IsString()
    @Length(5)
    name:string;

    @Field(type => Boolean, {nullable: true}) 
    @Column({default:true})
    @IsOptional() //해당 필드를 보내거나 보내지 않을 수 있다는 것을 의미
    @IsBoolean()
    caffeine:boolean;

    @Field(type => String, {defaultValue:"강남"})
    @Column()
    @IsOptional() //해당 필드를 보내거나 보내지 않을 수 있다는 것을 의미
    @IsString()
    address:string;

    @Field(type => String)
    @Column() 
    @IsString()
    ownerName:string;

    @Field(type => String)
    @Column() 
    @IsString()
    dessertName:string;
}