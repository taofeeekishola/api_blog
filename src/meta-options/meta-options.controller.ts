import { Body, Controller, Get, Post } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-options.service';
import { CreatePostMetaOptionsDto } from './dto/create-post-meta-options.dto';

/**
 * Class to create the routing for Metaoptions
 */
@Controller('meta-options')
export class MetaOptionsController {

    /**
     * Inject metaoptionsService i
     * @param metaOptionsService 
     */
    constructor(
        private readonly metaOptionsService: MetaOptionsService,
    ){}

    @Get()
    public getMetaOptions(){}

    @Post()
    public createMetaOptions(
        @Body() createMetaOptionsDto: CreatePostMetaOptionsDto
    ){
        return this.metaOptionsService.createMetaOptions(createMetaOptionsDto);
    }
}


