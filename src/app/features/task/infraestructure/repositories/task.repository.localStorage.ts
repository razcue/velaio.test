import { Task } from '../../domain/models/task.model';
import { ITaskRepository } from '../../domain/contracts/task.repository.contract';

export class TaskLocalStorageRepository implements ITaskRepository {
  private storageKey = 'tasks';
  private lastTaskId: bigint = BigInt(0);

  constructor() {
    this.loadLastId();
  }

  private loadLastId() {
    const taskId = localStorage.getItem('lastTaskId');
    this.lastTaskId = taskId ? BigInt(taskId) : BigInt(0);
  }

  getNextId(): bigint {
    this.lastTaskId += BigInt(1);
    this.saveLastId();
    return this.lastTaskId;
  }

  private saveLastId() {
    localStorage.setItem('lastTaskId', this.lastTaskId.toString());
  }

  save(task: Task): void {
    const tasks = this.getAll();
    tasks.push(task);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  getAll(): Task[] {
    const tasksJson = localStorage.getItem(this.storageKey);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  getById(id: bigint): Task | undefined {
    return this.getAll().find(task => task.id === id);
  }
}
