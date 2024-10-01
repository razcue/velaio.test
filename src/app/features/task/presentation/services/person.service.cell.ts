import { Injectable } from '@angular/core';
import { PersonLocalStorageRepository } from '../../infraestructure/repositories/person.repository.localStorage';
import { PersonService as PersonDomainService } from '../../domain/services/person.service';

@Injectable({
  providedIn: 'root',
})
export class PersonServiceCell extends PersonDomainService {
  constructor(private personLocalStorageRepository: PersonLocalStorageRepository) {
    super(personLocalStorageRepository);
  }
}
