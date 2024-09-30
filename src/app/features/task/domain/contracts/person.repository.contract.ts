import { Person } from '../models/person.model';

export interface IPersonRepository {
  getNextId(): bigint;
  save(person: Person): void;
  getAll(): Person[];
}
