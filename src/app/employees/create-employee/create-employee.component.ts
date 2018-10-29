import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable} from 'rxjs';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { Datastore } from '../../services/datastore.service';
import { Employee } from '../../models/employee.model';
import { Department } from '../../models/department.model';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
 
@Component({
    selector: 'app-create-employee',
    templateUrl: './create-employee.component.html',
    styleUrls: ['./create-employee.component.css'],
    providers: [Datastore, EmployeeService, DepartmentService]
})
 
export class CreateEmployeeComponent {
 
    create_employee_form: FormGroup;

    departments: Department[];

    @Output() show_read_employees_event = new EventEmitter();
 
    constructor(
        private employeeService: EmployeeService,
        private departmentService: DepartmentService,
        private formBuilder: FormBuilder
    ){
        this.create_employee_form = formBuilder.group({
            name: ['', Validators.required],
            active: [''],
            department_id: ['', Validators.required]
        });
    }
 
    createEmployee(){
        this.employeeService.createEmployee(this.create_employee_form.value).subscribe(
            employee => {
                this.readEmployees();
            },
            error => console.log(error)
        );
    }

    cancel(event){
        event.preventDefault()
        this.readEmployees();
    }
 
    readEmployees(){
        this.show_read_employees_event.emit({ title: "Read Employees" });
    }

    getDepartments() {
        this.departmentService.getDepartments().subscribe(
          (departments: JsonApiQueryData<Department>) => {
            this.departments = departments.getModels();
          }
        );
    }
 
    ngOnInit(){
        this.getDepartments();
    }
}
