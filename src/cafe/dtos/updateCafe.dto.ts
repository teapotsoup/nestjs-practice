import { ArgsType, Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateCafeDto } from "./createCafe.dto";

@InputType()
class UpdateCafeInputType extends PartialType(CreateCafeDto){

} 

@InputType()
export class UpdateCafeDto{

    @Field(type=>Number)
    id:number;

    @Field(type=>UpdateCafeInputType)
    data: UpdateCafeInputType;
}