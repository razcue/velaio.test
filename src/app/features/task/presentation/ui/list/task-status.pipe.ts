import { Pipe, PipeTransform } from '@angular/core';
import { TASK_STATUS_LABELS } from '../../constants';

@Pipe({
  name: 'taskStatus',
  standalone: true,
})
export class TaskStatusPipe implements PipeTransform {
  transform(completed: boolean): string {
    return completed ? TASK_STATUS_LABELS.COMPLETED : TASK_STATUS_LABELS.PENDING;
  }
}
