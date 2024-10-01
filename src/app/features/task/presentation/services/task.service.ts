import { Injectable } from '@angular/core';
import { TaskServiceCell } from './task.service.cell';
import { PersonServiceCell } from './person.service.cell';
import {Person} from "../../domain/models/person.model";
import {Task} from "../../domain/models/task.model";

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private taskService: TaskServiceCell,
    private personService: PersonServiceCell
  ) {}

  listTasks() {
    return this.taskService.listTasks();
  }

  getTaskById(taskId: bigint): Task | undefined {
    return this.taskService.getTaskById(taskId);
  }

  createTask(
    name: string,
    dateLimit: string,
    people: Person[] = [],
    completed: boolean = false
  ) {
    return this.taskService.createTask(name, dateLimit, people, completed);
  }

  completeTask(taskId: bigint) {
    return this.taskService.completeTask(taskId);
  }
}
