import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskStatusPipe } from './task-status.pipe';
import { TaskFormComponent } from '../form/task-form.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../domain/models/task.model';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

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
  ]
})
export class TaskListComponent {
  dataSource = new MatTableDataSource<Task>([]);
  displayedColumns: string[] = ['name', 'deadline', 'people', 'actions'];

  constructor(private dialog: MatDialog, private taskService: TaskService, private cdRef: ChangeDetectorRef) {
    this.taskService.getTasks().pipe(
      map(tasks => tasks ?? [])
    ).subscribe(tasks => {
      this.dataSource.data = [...tasks];
    });
  }

  openTaskForm(task?: Task) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: task ? task : null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (task) {
          const updatedTask = this.taskService.getTaskById(task.id);
          if (updatedTask) {
            Object.assign(task, updatedTask);
          }
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
}
