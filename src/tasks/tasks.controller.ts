import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  ParseIntPipe,
  Post,
  Put,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/create-task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TaskService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return {
      success: true,
      tasks: this.taskService.findAll(),
    };
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      tasks: this.taskService.findOne(id),
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateTaskDTO) {
    return {
      success: true,
      task: this.taskService.create(data),
      message: 'Task created successfully',
    };
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateTaskDTO) {
    return {
      success: true,
      task: this.taskService.update(id, data),
      message: 'Task updated successfully',
    };
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    this.taskService.remove(id);
    return {
      success: true,
      message: 'Task deleted successfully',
    };
  }
}