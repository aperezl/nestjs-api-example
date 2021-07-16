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
  Inject,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { CreateTaskDTO, UpdateTaskDTO } from './dto/create-task.dto';
import { TaskService } from './task.service';
import config from 'src/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private taskService: TaskService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return {
      success: true,
      tasks: await this.taskService.findAll(),
    };
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      task: await this.taskService.findOne(id),
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateTaskDTO) {
    return {
      success: true,
      task: await this.taskService.create(data),
      message: 'Task created successfully',
    };
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTaskDTO,
  ) {
    return {
      success: true,
      task: await this.taskService.update(id, data),
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
