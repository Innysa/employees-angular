import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable} from 'rxjs';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { Datastore } from '../../services/datastore.service';
import { Employee } from '../../models/employee.model';
import { Department } from '../../models/department.model';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
 
@Component({
    selector: 'app-update-employee',
    templateUrl: './update-employee.component.html',
    styleUrls: ['./update-employee.component.css'],
    providers: [Datastore, EmployeeService, DepartmentService]
})
export class UpdateEmployeeComponent implements OnChanges {
 
    update_employee_form: FormGroup;
 
    @Output() show_read_employees_event = new EventEmitter();
    @Input() employee_id;
 
    departments: Department[];
 
    constructor(
        private employeeService: EmployeeService,
        private departmentService: DepartmentService,
        private formBuilder: FormBuilder
    ){
        this.update_employee_form = this.formBuilder.group({
            name: ['', Validators.required],
            active: [''],
            department_id: ['', Validators.required]
        });
    }
 
    updateEmployee(){
        let department = this.getDepartment(this.update_employee_form.value.department_id);
        this.employeeService.getEmployee(this.employee_id).subscribe(
            (employee: Employee) => {
                employee.name = this.update_employee_form.value.name,
                employee.active = this.update_employee_form.value.active,
                employee.department = department,
                employee.save().subscribe(
                    employee => {
                        this.readEmployees();
                    },
                    error => console.log(error)
                );
            }
        );
    }

    cancel(event){
        event.preventDefault()
        this.readEmployees();
    }
 
    readEmployees(){
        this.show_read_employees_event.emit({ title: "Read Employees" });
    }
 
    ngOnChanges(){
 		this.getEmployee(this.employee_id);
    }

    getEmployee(employee_id) {
        this.employeeService.getEmployee(employee_id).subscribe(
            (employee: Employee) => {
            	this.update_employee_form.patchValue({
                    name: employee.name,
                    active: employee.active,
                    department_id: employee.department.id
                });
            }
        );
    }

    getDepartment(department_id) {
        return this.departmentService.getDepartment(department_id);
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