import { Person } from '../models/person.model';

export interface IPersonRepository {
  getNextId(): string;
  save(person: Person): void;
  getAll(): Person[];
}
