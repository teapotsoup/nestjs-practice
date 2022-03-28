import {InputType, OmitType } from "@nestjs/graphql";
import { Cafe } from "../entities/cafe.entity";

@InputType()
export class CreateCafeDto extends OmitType(Cafe, ["id"], InputType){}