import { Injectable } from '@angular/core';
import { JsonApiDatastoreConfig, JsonApiDatastore, DatastoreConfig } from 'angular2-jsonapi';
import { Employee } from '../models/employee.model';
import { Department } from '../models/department.model';
import { HttpClient } from '@angular/common/http';

const config: DatastoreConfig = {
  baseUrl: 'http://localhost:3000/api',
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
