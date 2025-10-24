import { Body, Controller, Delete, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CraeteTagDto } from './dto/create-tag.dto';
import { TagsService } from './providers/tags.service';

@Controller('tags')
export class TagsController {

    constructor(
        /**
         * Inject TagsService
         */
        private readonly tagsService: TagsService,
    ){}


    @Post()
    public create(@Body() createTagDto: CraeteTagDto){
        return this.tagsService.create(createTagDto);
    }

    @Delete()
    public async delete(@Query('id', ParseIntPipe)  id: number){
        return this.tagsService.delete(id)
    }

    @Delete('soft-delete')
    public async softDelete(@Query('id', ParseIntPipe)  id: number){
        // return this.tagsService.delete(id)
        return this.tagsService.softRemove(id);
    }

}
