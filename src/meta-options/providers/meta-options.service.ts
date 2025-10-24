import { Injectable } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from '../dto/create-post-meta-options.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../meta-option.entity';
import { Repository } from 'typeorm';

/**
 * Class for creating the business logic for MetaOptions
 */
@Injectable()
export class MetaOptionsService {

    constructor(
        /**
         * Inject metaOptionsRepository
         */
        @InjectRepository(MetaOption)
        private readonly metaOptionsRepository: Repository<MetaOption>
    ){}

    public getMetaOptions(){

    }

    //method to create a meta-options
    public async createMetaOptions(createMetaOptionsDto: CreatePostMetaOptionsDto){
        let metaOptions = this.metaOptionsRepository.create(createMetaOptionsDto);

        return await this.metaOptionsRepository.save(metaOptions);
    }
}
