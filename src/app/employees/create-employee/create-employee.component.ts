import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable} from 'rxjs';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { Datastore } from '../../datastore.service';
import { Employee } from '../../employee';
import { Department } from '../../department';
 
@Component({
    selector: 'app-create-employee',
    templateUrl: './create-employee.component.html',
    styleUrls: ['./create-employee.component.css'],
    providers: [Datastore]
})
 
export class CreateEmployeeComponent {
 
    create_employee_form: FormGroup;

    departments: Department[];
    employees: Employee[];

    @Output() show_read_employees_event = new EventEmitter();
 
    constructor(
        private  datastore: Datastore,
        formBuilder: FormBuilder
    ){
        this.create_employee_form = formBuilder.group({
            name: ["", Validators.required],
            active: [""],
            department_id: ["", Validators.required]
        });
    }
 
    createEmployee(){
        let department = this.datastore.peekRecord(Department, this.create_employee_form.value.department_id );
        this.datastore.createRecord(Employee, {
            name: this.create_employee_form.value.name,
            active: this.create_employee_form.value.active,
            department: department,
        }).save().subscribe(
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
        this.datastore.findAll(Department).subscribe(
          (departments: JsonApiQueryData<Department>) => {
            this.departments = departments.getModels();
          }
        );
    }
 
    ngOnInit(){
        this.getDepartments();
    }
}
