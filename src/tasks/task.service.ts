import { Injectable, Inject } from '@nestjs/common';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor() {}

  findAll() {}

  findOne(id: number) {}

  create(data: CreateTaskDTO) {}

  update(taskId: number, data: UpdateTaskDTO) {}

  remove(id: number) {}
}
