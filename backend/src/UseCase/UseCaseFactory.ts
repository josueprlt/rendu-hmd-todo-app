import { Injectable } from '@nestjs/common';
import ServiceFactory from '../ServiceFactory';
import CreateTaskUseCase from './CreateTask/CreateTaskUseCase';
import DeleteTask from './DeleteTask/DeleteTask';
import GetAllTasksUseCase from './GetAllTasks/GetAllTasksUseCase';

type UseCases = GetAllTasksUseCase | DeleteTask | CreateTaskUseCase;

@Injectable()
export default class UseCaseFactory extends ServiceFactory<UseCases> {}
