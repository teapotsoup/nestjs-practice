import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCafeDto } from "./dtos/createCafe.dto";
import { UpdateCafeDto } from "./dtos/updateCafe.dto";
import { Cafe } from "./entities/cafe.entity";

@Injectable()
export class CafeService{
    constructor(@InjectRepository(Cafe) private readonly cafe:Repository<Cafe>){}
    getAll():Promise<Cafe[]>{
        return this.cafe.find() 
    }
    createCafe(createCafeDto: CreateCafeDto): Promise<Cafe>{
        const newCafe = this.cafe.create(createCafeDto)
        console.log(newCafe)
        return this.cafe.save(newCafe) //Promise<Cafe>
    }
    updateCafe({id, data}:UpdateCafeDto){
        return  this.cafe.update(id,{...data})
    }
}
//CafeService를 만들어서 CafeResolver에서 사용