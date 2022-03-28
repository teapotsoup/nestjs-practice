import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CafeService } from "./cafe.service";
import { CreateCafeDto } from "./dtos/createCafe.dto";
import { UpdateCafeDto,} from "./dtos/updateCafe.dto";
import { Cafe } from "./entities/cafe.entity";

@Resolver(type=>Cafe)
export class CafeResolver{
    constructor(private readonly cafeService: CafeService){}
    @Query(returns=>[Cafe]) 
    myCafe():Promise<Cafe[]>{ //@Args 지우기
        return this.cafeService.getAll(); //CafeService.getAll()을 리턴
    }
    @Mutation(returns => Boolean)
    async createCafe(
        @Args('input') createCafeDto: CreateCafeDto, //input 삽입
    ): Promise<boolean>{
        try{
            await this.cafeService.createCafe(createCafeDto);
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    }
    @Mutation(returns => Boolean)
    async updateCafe(
        @Args('input') updateCafeDto: UpdateCafeDto,
    ): Promise<boolean>{
        try{
            await this.cafeService.updateCafe(updateCafeDto);
            return true
        }catch(e){
            console.log(e);
            return false;
        }
    }
}
