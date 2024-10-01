import { Task } from '../models/task.model';

export interface ITaskRepository {
  getNextId(): string;
  save(task: Task): void;
  getAll(): Task[];
  getById(id: string): Task | undefined;
}
