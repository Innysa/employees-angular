import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Department } from '../models/department.model';
 
@Injectable({
  providedIn: 'root'
})
 
export class DepartmentService {

 	private host = 'http://localhost:3001';
          path = '/api/departments';
 					url = this.host + this.path;

  constructor(private _http: Http) { }

  readDepartments(): Observable<Department[]>{
    return this._http
      .get(this.url)
      .pipe(map((res: Response) => res.json()));
  }
}
