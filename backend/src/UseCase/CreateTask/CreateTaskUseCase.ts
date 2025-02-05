import { Injectable, BadRequestException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import CreateTaskDto from './CreateTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class CreateTaskUseCase implements UseCase<Promise<Task>, [dto: CreateTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: CreateTaskDto): Promise<Task> {
    if (!dto.name) {
      throw new BadRequestException('Task name is required');
    }

    try {
      const task = await this.taskRepository.create({
        name: dto.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return task;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}