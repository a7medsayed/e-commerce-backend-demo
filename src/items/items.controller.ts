import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/shared/decorators/user.decorator';
import { CreateItemDto } from './dtos/create.item.dto';
import { ItemsService } from './items.service';

@Controller('item')
export class ItemsController {

    constructor(private itemsService: ItemsService) {}

    @Post('create')
    @UseGuards(AuthGuard())
    createItem(@Body() createItemDto: CreateItemDto)
    {
        return this.itemsService.create(createItemDto);
    }

    @Get('all')
    @UseGuards(AuthGuard())
    async getAll(@Query('limit') limit , @Query('page') page){
        return await this.itemsService.findAll(parseInt(limit) , parseInt(page));
    }

    @Get('active')
    @UseGuards(AuthGuard())
    async getActive(@Query('limit') limit , @Query('page') page){
        return await this.itemsService.findActive(parseInt(limit) , parseInt(page));
    }
}
