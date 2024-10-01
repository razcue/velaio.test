import { Injectable } from '@angular/core';
import { TaskServiceCell } from './task.service.cell';
import { PersonServiceCell } from './person.service.cell';
import { Person } from '../../domain/models/person.model';
import { Task } from '../../domain/models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>(this.listTasks());

  constructor(
    private taskService: TaskServiceCell,
    private personService: PersonServiceCell
  ) {}

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  listTasks(): Task[] {
    return this.taskService.listTasks();
  }

  getTaskById(taskId: string): Task | undefined {
    return this.taskService.getTaskById(taskId);
  }

  createTask(
    name: string,
    deadline: string,
    people: [] = [],
  ): Task {
    let peopleList: Person[] = [];

    for (const person of people) {
      const personInstance = this.personService.createPerson(person['name'], person['age'], person['skills']);
      peopleList.push(personInstance);
    }

    const newTask: Task = this.taskService.createTask(name, deadline, peopleList);
    const tasks = [...this.tasksSubject.getValue(), newTask];
    this.tasksSubject.next(tasks);

    return newTask;
  }

  completeTask(taskId: string): Promise<void> {
    return new Promise((resolve) => {
      this.taskService.completeTask(taskId);

      setTimeout(() => {
        const tasks = this.tasksSubject.getValue();
        this.tasksSubject.next([...tasks]);
        resolve();
      }, 0);
    });
  }
}
