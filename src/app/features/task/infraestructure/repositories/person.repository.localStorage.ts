import { Person } from '../../domain/models/person.model';
import { IPersonRepository } from '../../domain/contracts/person.repository.contract';

export class PersonLocalStorageRepository implements IPersonRepository {
  private storageKey = 'people';
  private lastPersonId: bigint = BigInt(0);

  constructor() {
    this.loadLastId();
  }

  private loadLastId() {
    const personId = localStorage.getItem('lastPersonId');
    this.lastPersonId = personId ? BigInt(personId) : BigInt(0);
  }

  getNextId(): string {
    this.lastPersonId += BigInt(1);
    this.saveLastId();

    return this.lastPersonId.toString();
  }

  private saveLastId() {
    localStorage.setItem('lastPersonId', this.lastPersonId.toString());
  }

  save(person: Person): void {
    const people = this.getAll();

    const personToSave = {
      ...person,
      id: person.id.toString()
    };

    const index = people.findIndex(p => p.id === person.id);

    if (index >= 0) {
      people[index] = personToSave;
    } else {
      people.push(personToSave);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(people));
  }

  getAll(): Person[] {
    const peopleJson = localStorage.getItem(this.storageKey);
    return peopleJson ? JSON.parse(peopleJson) : [];
  }
}
