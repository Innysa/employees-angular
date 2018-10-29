import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Department } from '../models/department.model';
import { Datastore } from '../services/datastore.service';
 
@Injectable({
 	providedIn: 'root'
})
 
export class DepartmentService {

	constructor(private  datastore: Datastore) { }

	getDepartment(department_id): Department {
		return this.datastore.peekRecord(Department, department_id);
	}

	getDepartments() {
		return this.datastore.findAll(Department);
	}
}
