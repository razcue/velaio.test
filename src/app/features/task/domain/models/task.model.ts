import { Person } from './person.model';

export class Task {
  constructor(
    public id: bigint,
    public name: string,
    public dateLimit: string,
    public people: Person[],
    public completed: boolean
  ) {}
}
