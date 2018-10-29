import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { Observable, fromEvent, timer } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { Datastore } from '../../services/datastore.service';
import { EmployeeService } from '../../services/employee.service';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';
 
@Component({
    selector: 'app-read-employees',
    templateUrl: './read-employees.component.html',
    styleUrls: ['./read-employees.component.css'],
    providers: [Datastore, EmployeeService]
})
 
export class ReadEmployeesComponent implements OnInit {
    @Output() show_create_employee_event=new EventEmitter();
    @Output() show_get_employee_event=new EventEmitter();
    @Output() show_update_employee_event=new EventEmitter();
    @Output() show_delete_employee_event=new EventEmitter();
    @Output() pageChange: EventEmitter<number>;

    employees: Employee[];
    page: number = 1;
    perPage: number = 10;
    search: string = '';
    totalCount : number;

    constructor(private employeeService: EmployeeService,
                private formBuilder: FormBuilder){}

    createEmployee(){
        this.show_create_employee_event.emit({
            title: "Create Employee"
        });
    }

    getEmployee(id){
        this.show_get_employee_event.emit({
            employee_id: id,
            title: "Get Employee"
        });
    }

    updateEmployee(id){
        this.show_update_employee_event.emit({
            employee_id: id,
            title: "Update Employee"
        });
    }

    deleteEmployee(id){
        this.show_delete_employee_event.emit({
            employee_id: id,
            title: "Delete Employee"
        });
    }

    ngOnInit(){
        this.getEmployees();
    }

    getEmployees() {
        this.employeeService.getEmployees(this.page, this.perPage, this.search).subscribe(
            (employees: JsonApiQueryData<Employee>) => {
                this.employees = employees.getModels();
                this.totalCount = employees.getMeta().meta.total;
        });
    }

    getPage(page: number) {
        this.page = page;
        this.getEmployees();
    }

    searchEmployee(str: HTMLInputElement){
        this.search = str.value;
        this.page = 1;
        this.getEmployees();
    }
}
