import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employee } from '../models/employee.model';
import { Datastore } from '../datastore.service';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private host = 'http://localhost:3001';
          path = '/api/employees';
          headers = new Headers({ 'Content-Type': 'application/json' });
          httpOptions = {
            headers: this.headers
          };
  private url = this.host + this.path;

  constructor(private _http : Http, private  datastore: Datastore){ }

  // readEmployees(): Observable<Employee[]>{
  //   return this._http
  //     .get(this.url)
  //     .pipe(map((res: Response) => res.json()));
  // }

  createEmployee(employee): Observable<Employee>{
    return this._http.post(
      this.url,
      employee,
      this.httpOptions
    ).pipe(map((res: Response) => res.json()));
  }

  getEmployee(employee_id): Observable<Employee>{
    return this._http
      .get(`${this.url}/${employee_id}`)
      .pipe(map((res: Response) => res.json()));
  }

  updateEmployee(employee): Observable<Employee>{
    return this._http.put(
      `${this.url}/${employee.id}`,
      employee,
      this.httpOptions
    ).pipe(map((res: Response) => res.json()));
  }

  deleteEmployee(employee_id){
    return this._http.delete(
        `${this.url}/${employee_id}`,
        this.httpOptions
    ).pipe(map((res: Response) => res.json()));
  }


  getEmployees() {
  return this.datastore.findAll(Employee, {
    include: 'departments'
  })
}
}
