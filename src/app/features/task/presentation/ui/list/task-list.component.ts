import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskStatusPipe } from './task-status.pipe';
import { TaskFormComponent } from '../form/task-form.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../domain/models/task.model';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { TASK_FILTER_LABELS, TASK_FILTER_OPTIONS } from '../../constants';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    TaskFormComponent,
    TaskStatusPipe,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
  ]
})
export class TaskListComponent {
  dataSource = new MatTableDataSource<Task>([]);
  displayedColumns: string[] = ['name', 'deadline', 'people', 'actions'];
  filterCompleted = false;
  filterPending = false;
  filterAll = true;

  constructor(private dialog: MatDialog, private taskService: TaskService, private cdRef: ChangeDetectorRef) {
    this.taskService.getTasks().pipe(
      map(tasks => tasks ?? [])
    ).subscribe(tasks => {
      this.dataSource.data = [...tasks];
    });
  }

  applyFilter(tasks: Task[], option: string) {
    if (!this.filterAll && !this.filterCompleted && !this.filterPending) {
      this.dataSource.data = [];
    } else if (option === TASK_FILTER_OPTIONS.ALL) {
      this.filterCompleted = false;
      this.filterPending = false;
      this.dataSource.data = tasks;
    } else if (option === TASK_FILTER_OPTIONS.COMPLETED) {
      this.dataSource.data = tasks.filter(task => task.completed);
      this.filterAll = false;
      this.filterPending = false;
    } else if (option === TASK_FILTER_OPTIONS.PENDING) {
      this.dataSource.data = tasks.filter(task => !task.completed);
      this.filterAll = false;
      this.filterCompleted = false;
    }
  }

  onFilterChange(option: string) {
    this.applyFilter(this.taskService.listTasks(), option);
  }

  openTaskForm(task?: Task) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: task ? task : null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (task) {
          this.taskService.updateTask(task['id'], result['name'], result['deadline'], result['people'], task['completed']).then(() => {
            this.dataSource.data = [...this.taskService.listTasks()];
          });
        } else {
          this.taskService.createTask(result.name, result.deadline, result.people);
        }
      }
    });
  }

  editTask(task: Task) {
    this.openTaskForm(task);
  }

  async completeTask(task: Task) {
    await this.taskService.completeTask(task.id);
    this.dataSource.data = [...this.taskService.listTasks()];
  }

  protected readonly TASK_FILTER_OPTIONS = TASK_FILTER_OPTIONS;
  protected readonly TASK_FILTER_LABELS = TASK_FILTER_LABELS;
}
