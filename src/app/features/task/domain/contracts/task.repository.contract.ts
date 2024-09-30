import { Task } from '../models/task.model';

export interface ITaskRepository {
  getNextId(): bigint;
  save(task: Task): void;
  getAll(): Task[];
  getById(id: bigint): Task | undefined;
}
