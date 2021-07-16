import { Injectable, Inject } from '@nestjs/common';
import { Client } from 'pg';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(@Inject('DB') private client: Client) {}


  findAll() {
    return new Promise((resolve, reject) => {
      this.client.query(`SELECT * FROM tasks`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result.rows);
      });
    });
  }

  findOne(id: number) {
    return new Promise((resolve, reject) => {
      this.client.query(
        `SELECT * FROM tasks WHERE id=$1`,
        [id],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result.rows[0]);
        },
      );
    });
  }

  create(data: CreateTaskDTO) {
    return new Promise((resolve, reject) => {
      this.client.query(
        `INSERT INTO tasks (name, description) VALUES ($1, $2) RETURNING id`,
        [data.name, data.description],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result.rows[0]);
        },
      );
    });
  }

  update(taskId: number, data: UpdateTaskDTO) {
    return new Promise((resolve, reject) => {
      this.client.query(
        'UPDATE tasks SET name = $1, description = $2 WHERE id = $3',
        [data.name, data.description, taskId],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result.rows);
        },
      );
    });
  }

  remove(id: number) {
    return new Promise((resolve, reject) => {
      this.client.query(
        'DELETE FROM tasks WHERE id = $1',
        [id],
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result.rows[0]);
        },
      );
    });
  }
}
