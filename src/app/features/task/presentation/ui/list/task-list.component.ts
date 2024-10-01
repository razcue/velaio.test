import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  tasks: Task[] = [];
  displayedColumns: string[] = ['name', 'deadline', 'people', 'actions'];

  constructor(private dialog: MatDialog, private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.listTasks();
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
            Object.assign(task, updatedTask); // Update task in the table
          }
        } else {
          const newTask = this.taskService.createTask(result.name, result.dateLimit, result.people);
          this.tasks.push(newTask); // Add the new task to the list
        }
      }
    });
  }

  editTask(task: Task) {
    this.openTaskForm(task);
  }

  completeTask(task: Task) {
    this.taskService.completeTask(task.id);
    task.completed = true;
  }
}
