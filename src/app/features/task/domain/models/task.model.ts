import { Person } from './person.model';

export class Task {
  constructor(
    public id: string,
    public name: string,
    public deadline: string,
    public people: Person[],
    public completed: boolean
  ) {}
}
