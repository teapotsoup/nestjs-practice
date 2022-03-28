import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CafeResolver } from './cafe.resolver';
import { CafeService } from './cafe.service';
import { Cafe } from './entities/cafe.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cafe])], //TypeORM을 써서 Cafe repository를 import
    providers:[CafeResolver, CafeService] // 레포지토리 사용을 위해
})
export class CafeModule {}
