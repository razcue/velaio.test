import { Injectable } from '@angular/core';
import { TaskService as TaskDomainService } from '../../domain/services/task.service';
import { TaskLocalStorageRepository } from '../../infraestructure/repositories/task.repository.localStorage';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceCell extends TaskDomainService {
  constructor(private taskLocalStorageRepository: TaskLocalStorageRepository) {
    super(taskLocalStorageRepository);
  }
}
