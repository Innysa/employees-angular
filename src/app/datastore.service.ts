import { Injectable } from '@angular/core';
import { JsonApiDatastoreConfig, JsonApiDatastore, DatastoreConfig } from 'angular2-jsonapi';
import { Employee } from './employee';
import { Department } from './department';
import { HttpClient } from '@angular/common/http';

const config: DatastoreConfig = {
  baseUrl: 'http://localhost:3000/api/v1',
  models: {
    employees: Employee,
    departments: Department
  }
}

@Injectable()
@JsonApiDatastoreConfig(config)
export class Datastore extends JsonApiDatastore {

    constructor(http: HttpClient) {
        super(http);
    }

}