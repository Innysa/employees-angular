import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable} from 'rxjs';
import { Datastore } from '../../services/datastore.service';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
    selector: 'app-delete-employee',
    templateUrl: './delete-employee.component.html',
    styleUrls: ['./delete-employee.component.css'],
    providers: [Datastore, EmployeeService]
})
 
export class DeleteEmployeeComponent {
    @Output() show_read_employees_event = new EventEmitter();
    @Input() employee_id;
 
    constructor(private employeeService: EmployeeService){}
 
    deleteEmployee(){
        this.employeeService.deleteEmployee(this.employee_id).subscribe(
            employee => {
                this.readEmployees();
            },
            error => console.log(error)
        );
    }
 
    readEmployees(){
        this.show_read_employees_event.emit({ title: "Read Employees" });
    }
 
}
