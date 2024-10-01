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

  getNextId(): string {
    this.lastTaskId += BigInt(1);
    this.saveLastId();

    return this.lastTaskId.toString();
  }

  private saveLastId() {
    localStorage.setItem('lastTaskId', this.lastTaskId.toString());
  }

  save(task: Task): void {
    const tasks = this.getAll();

    const taskToSave = {
      ...task,
      id: task.id.toString()
    };

    const index = tasks.findIndex(t => t.id === task.id);

    if (index >= 0) {
      tasks[index] = taskToSave;
    } else {
      tasks.push(taskToSave);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  getAll(): Task[] {
    const tasksJson = localStorage.getItem(this.storageKey);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  getById(id: string): Task | undefined {
    return this.getAll().find(task => task.id === id);
  }
}
