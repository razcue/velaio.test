import { Component } from '@angular/core';
import { TaskListComponent } from './features/task/presentation/ui/list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    TaskListComponent,
  ]
})
export class AppComponent {}
