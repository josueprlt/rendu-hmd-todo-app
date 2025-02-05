import { Injectable, BadRequestException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    if (!dto.name) {
      throw new BadRequestException('Task name is required');
    }

    try {
      const task = await this.taskRepository.save({
        id: dto.id,
        name: dto.name,
        updatedAt: new Date(),
      });

      return task;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}