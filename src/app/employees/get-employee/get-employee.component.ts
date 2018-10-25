import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Observable} from 'rxjs';
// import { EmployeeService } from '../../services/employee.service';
import { Datastore } from '../../datastore.service';
import { Employee } from '../../employee';
import { Department } from '../../department';
 
@Component({
    selector: 'app-get-employee',
    templateUrl: './get-employee.component.html',
    styleUrls: ['./get-employee.component.css'],
    providers: [Datastore]
})
 
export class GetEmployeeComponent implements OnChanges {
    @Output() show_read_employees_event = new EventEmitter();
    @Input() employee_id;
 
    employee: Employee;
 
    constructor(private datastore: Datastore){}
 
    readEmployees(){
        this.show_read_employees_event.emit({ title: "Read Employees" });
    }
 
    ngOnChanges(){
    	this.getEmployee(this.employee_id);
    }

    getEmployee(employee_id) {
	    this.datastore.findRecord(Employee, employee_id).subscribe(
            (employee: Employee) => {
    	      	this.employee = employee
    	    }
        );
    }
}
