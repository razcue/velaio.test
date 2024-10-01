import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
  AbstractControl
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Person } from '../../../domain/models/person.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ]
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaskFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = this.fb.group({
      name: [data ? data.name : '', [Validators.required, Validators.minLength(5)]],
      deadline: [data ? data.deadline : '', Validators.required],
      people: this.fb.array([], this.minLengthArray(1)),
    });

    if (data && data.people) {
      data.people.forEach((person: Person) => this.addPerson(person));
    }
  }

  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  newPerson(person: any = { id: '', name: '', age: '', skills: [] }): FormGroup {
    return this.fb.group({
      id: [person.id],
      name: [person.name, [Validators.required, Validators.minLength(5)]],
      age: [person.age, [Validators.required, Validators.min(18)]],
      skills: this.fb.array(
        (person.skills || []).map((skill: string) => this.fb.control(skill, Validators.required)),
        this.minLengthArray(1)
      )
    });
  }

  addPerson(person?: any): void {
    this.people.push(this.newPerson(person));
  }

  removePerson(index: number): void {
    this.people.removeAt(index);
  }

  getSkills(personIndex: number): FormArray {
    return this.people.at(personIndex).get('skills') as FormArray;
  }

  getSkillControl(personIndex: number, skillIndex: number): FormControl {
    return this.getSkills(personIndex).at(skillIndex) as FormControl;
  }

  addSkill(personIndex: number): void {
    this.getSkills(personIndex).push(this.fb.control('', Validators.required));
  }

  removeSkill(personIndex: number, skillIndex: number): void {
    this.getSkills(personIndex).removeAt(skillIndex);
  }

  onSave(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  minLengthArray(min: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control instanceof FormArray) {
        return control.length >= min ? null : { minLengthArray: true };
      }
      return null;
    };
  }
}
