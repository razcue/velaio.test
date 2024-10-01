import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  TaskLocalStorageRepository
} from './app/features/task/infraestructure/repositories/task.repository.localStorage';
import {
  PersonLocalStorageRepository
} from './app/features/task/infraestructure/repositories/person.repository.localStorage';
import { MAT_DATE_FORMATS, DateAdapter} from '@angular/material/core';
import { CUSTOM_DATE_FORMATS } from './app/features/task/presentation/constants';
import { CustomDateAdapter } from './app/features/task/presentation/services/custom-date.adapter';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    TaskLocalStorageRepository,
    PersonLocalStorageRepository,
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ]
}).catch(err => console.error(err));
