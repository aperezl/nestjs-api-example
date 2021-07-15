import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/create-task.dto';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TaskService {
  private tasks: TaskEntity[] = [];

  findAll(): TaskEntity[] {
    return this.tasks;
  }

  findOne(id: number): TaskEntity {
    const foundTask: TaskEntity = this.tasks.find((task) => task.id === id);
    if (!foundTask) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }
    return foundTask;
  }

  create(data: CreateTaskDTO): TaskEntity {
    const newTask: TaskEntity = {
      id: this.tasks.length + 1,
      ...data,
    };
    this.tasks.unshift(newTask);
    return newTask;
  }

  update(taskId: number, data: UpdateTaskDTO): TaskEntity {
    const foundTask: number = this.tasks.findIndex(
      (task) => task.id === taskId,
    );
    if (foundTask === -1) {
      throw new NotFoundException(`Task with id: ${taskId} not found`);
    }
    this.tasks[foundTask] = {
      ...this.tasks[foundTask],
      ...data,
    };
    return this.tasks[foundTask];
  }

  remove(id: number): string {
    const foundTask: number = this.tasks.findIndex((task) => task.id === id);
    if (foundTask === -1) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return `delete: ${id}`;
  }
}
