import { Injectable } from '@angular/core';
import { TaskService as TaskDomainService } from '../../domain/services/task.service';
import { TaskLocalStorageRepository } from '../../infraestructure/repositories/task.repository.localStorage';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends TaskDomainService {
  constructor() {
    super(new TaskLocalStorageRepository());
  }
}
