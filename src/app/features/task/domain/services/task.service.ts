import { ITaskRepository } from '../contracts/task.repository.contract';
import { Task } from '../models/task.model';
import { Person } from '../models/person.model';

export class TaskService {
  constructor(private taskRepository: ITaskRepository) {}

  createTask(
    name: string,
    dateLimit: string,
    people: Person[] = [],
    completed: boolean = false
  ): Task {
    const id = this.taskRepository.getNextId();
    const newTask = new Task(id, name, dateLimit, people, completed);
    this.validateTask(newTask);
    this.taskRepository.save(newTask);

    return newTask;
  }

  listTasks(): Task[] {
    return this.taskRepository.getAll();
  }

  completeTask(taskId: bigint) {
    const task = this.taskRepository.getById(taskId);

    if (task) {
      if (task.completed) {
        throw new Error("La tarea ya se encuentra completada.");
      }

      task.completed = true;
      this.taskRepository.save(task);
    } else {
      throw new Error("No se encuentra la tarea.");
    }
  }

  filterTasks(completed: boolean): Task[] {
    return this.taskRepository.getAll().filter(task => task.completed === completed);
  }

  getTaskById(taskId: bigint): Task | undefined {
    return this.taskRepository.getById(taskId);
  }

  private validateTask(task: Task) {
    if (task.name.length < 5) {
      throw new Error("El nombre debe tener al menos 5 caracteres.");
    }

    //TODO validate dateLimit

    if (task.people.length === 0) {
      throw new Error("La terea debe estar asignada al menos a una persona.");
    }

    //TODO validate each person
    // for (const person of task.people) {
    //   person.validatePerson();
    // }
  }
}
