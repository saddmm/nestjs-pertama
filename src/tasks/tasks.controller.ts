
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';

@Controller('tasks')
export class TasksController {
  @Get()
  listTasks() {
    return 'Nyoba Get';
  }

  @Post()
  createTask(@Body() body: CreateTaskDto) {
    return body;
  }

  @Get('/:id')
  getTask(@Param('id') id: string) {
    return `Nyoba Get ${id}`;
  }
}
