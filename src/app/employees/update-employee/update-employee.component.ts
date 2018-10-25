import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable} from 'rxjs';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { Datastore } from '../../datastore.service';
import { Employee } from '../../employee';
import { Department } from '../../department';
 
@Component({
    selector: 'app-update-employee',
    templateUrl: './update-employee.component.html',
    styleUrls: ['./update-employee.component.css'],
    providers: [Datastore]
})
export class UpdateEmployeeComponent implements OnChanges {
 
    update_employee_form: FormGroup;
 
    @Output() show_read_employees_event = new EventEmitter();
    @Input() employee_id;
 
    departments: Department[];
 
    constructor(
        private  datastore: Datastore,
        private formBuilder: FormBuilder
    ){
        this.update_employee_form = this.formBuilder.group({
            name: ["", Validators.required],
            active: [""],
            department_id: ["", Validators.required]
        });
    }
 
    updateEmployee(){
        let department = this.datastore.peekRecord(Department, this.update_employee_form.value.department_id );
        this.datastore.findRecord(Employee, this.employee_id, {
            include: 'department'
        }).subscribe(
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
	    this.datastore.findRecord(Employee, employee_id, {
		    include: 'departments'
		}).subscribe(
            (employee: Employee) => {
            	this.update_employee_form.patchValue({
                    name: employee.name,
                    active: employee.active,
                    department_id: employee.department.id
                });
            }
        );
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