import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }
    
    @Get()
    find() {
        return this.userService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.find(id)
    }

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.create(userDto)
    }

    @Post('update/:id')
    update(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(id, body)
    }
}
