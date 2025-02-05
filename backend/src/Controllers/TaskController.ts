import { Controller, Get, Post, Patch, Param, Body, Delete, BadRequestException } from '@nestjs/common';
import CreateTaskDto from '../UseCase/CreateTask/CreateTaskDto';
import CreateTaskUseCase from '../UseCase/CreateTask/CreateTaskUseCase';
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
      return { task: newTask }; // Ensure the response is a valid JSON object
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch('/tasks/:id')
  async update(@Body() dto: SaveTaskDto) {
    // @todo YOU MUST FOLLOW THE SAME IMPLEMENTATION AS OTHER ENDPOINTS
  }

  @Delete('/tasks/:id')
  async delete(@Param('id') id: string) {
    return (await this.useCaseFactory.create(DeleteTask)).handle(Number(id));
  }
}
