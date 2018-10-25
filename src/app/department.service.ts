// import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
// import { Observable} from 'rxjs';
// import { map } from 'rxjs/operators';
// import { catchError } from 'rxjs/operators';
// import { Department } from './department';
 
// @Injectable({
//   providedIn: 'root'
// })
 
// // Service for departments data.
// export class DepartmentService {
 
//   // We need Http to talk to a remote server.
//   constructor(private _http: Http) { }

//   // Get list of departments from database via api.
//   readDepartments(): Observable<Department[]>{
//     return this._http
//       .get("http://localhost:3001/api/departments")
//       .pipe(map((res: Response) => res.json()));
//   }
// }
