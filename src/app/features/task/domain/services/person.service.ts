import { Person } from '../models/person.model';
import { IPersonRepository } from '../contracts/person.repository.contract';

export class PersonService {
  constructor(private personRepository: IPersonRepository) {}

  createPerson(
    name: string,
    age: number,
    skills: string[] = []
  ): Person {
    const id = this.personRepository.getNextId();
    const newPerson = new Person(id, name, age, skills);
    this.validatePerson(newPerson);
    this.personRepository.save(newPerson);

    return newPerson;
  }

  updatePerson(
    id: string,
    name: string,
    age: number,
    skills: string[] = []
  ): Person {
    const person = new Person(id, name, age, skills);
    this.personRepository.save(person);

    return person;
  }

  private validatePerson(person: Person): void {
    if (person.name.length < 5) {
      throw new Error("El nombre debe tener al menos 5 caracteres.");
    }

    if (person.age < 18) {
      throw new Error("La persona debe ser mayor de 18 años.");
    }

    if (person.skills.length === 0) {
      throw new Error("La persona debe tener al menos una habilidad.");
    }
  }
}
