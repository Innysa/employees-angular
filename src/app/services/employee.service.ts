import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employee } from '../models/employee.model';
import { Department } from '../models/department.model';
import { Datastore } from '../services/datastore.service';
import { JsonApiQueryData } from 'angular2-jsonapi';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {

    constructor(private  datastore: Datastore){ }

    createEmployee(employeeFormValue): Observable<Employee> {
        let department = this.datastore.peekRecord(Department, employeeFormValue.department_id);
        return this.datastore.createRecord(Employee, {
            name: employeeFormValue.name,
            active: employeeFormValue.active,
            department: department,
        }).save();
    }

    getEmployee(employee_id): Observable<Employee>{
        return this.datastore.findRecord(Employee, employee_id);
    }

    deleteEmployee(employee_id) {
        return this.datastore.deleteRecord(Employee, employee_id);
    }


    getEmployees(page = 1, perPage = 10, search = ''): Observable<JsonApiQueryData<Employee>> {
        return this.datastore.findAll(Employee, {
            page: page,
            per_page: perPage,
            search: search
        });
    }
}
