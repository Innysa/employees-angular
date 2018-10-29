import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Observable} from 'rxjs';
import { Datastore } from '../../services/datastore.service';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
 
@Component({
    selector: 'app-get-employee',
    templateUrl: './get-employee.component.html',
    styleUrls: ['./get-employee.component.css'],
    providers: [Datastore, EmployeeService]
})
 
export class GetEmployeeComponent implements OnChanges {
    @Output() show_read_employees_event = new EventEmitter();
    @Input() employee_id;
 
    employee: Employee;
 
    constructor(private employeeService: EmployeeService){}
 
    readEmployees(){
        this.show_read_employees_event.emit({ title: "Read Employees" });
    }
 
    ngOnChanges(){
    	this.getEmployee(this.employee_id);
    }

    getEmployee(employee_id) {
	    this.employeeService.getEmployee(employee_id).subscribe(
            (employee: Employee) => {
    	      	this.employee = employee
    	    },
            error => console.log(error)
        );
    }
}
