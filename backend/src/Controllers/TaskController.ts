import { Controller, Get, Post, Patch, Param, Body, Delete, BadRequestException } from '@nestjs/common';
import CreateTaskDto from '../UseCase/CreateTask/CreateTaskDto';
import CreateTaskUseCase from '../UseCase/CreateTask/CreateTaskUseCase';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';
import SaveTaskUseCase from '../UseCase/SaveTask/SaveTaskUseCase';
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';
import DeleteTask from '../UseCase/DeleteTask/DeleteTask';
import UseCaseFactory from '../UseCase/UseCaseFactory';

@Controller()
export default class TaskController {
  constructor(private readonly useCaseFactory: UseCaseFactory) { }

  @Get('/tasks')
  async getAll() {
    return (await this.useCaseFactory.create(GetAllTasksUseCase)).handle();
  }

  @Post('/tasks')
  async create(@Body() dto: CreateTaskDto) {
    try {
      const createTaskUseCase = await this.useCaseFactory.create(CreateTaskUseCase);
      const newTask = await createTaskUseCase.handle(dto);
      return { task: newTask };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: SaveTaskDto) {
    try {
      dto.id = id;
      dto.updatedAt = new Date();
      const saveTaskUseCase = await this.useCaseFactory.create(SaveTaskUseCase);
      const updatedTask = await saveTaskUseCase.handle(dto);
      return { task: updatedTask };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return (await this.useCaseFactory.create(DeleteTask)).handle(Number(id));
  }
}
