import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ): Promise<Task> {
    const { id, ...rest } = data as Prisma.TaskUncheckedCreateInput & { id?: number };
    return this.prisma.task.upsert({
      where: { id: id ?? 0 },
      update: rest as Prisma.TaskUpdateInput,
      create: rest as Prisma.TaskCreateInput,
    });
  }
}
