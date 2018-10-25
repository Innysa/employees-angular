import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable} from 'rxjs';
import { Datastore } from '../../datastore.service';
import { Employee } from '../../employee';

@Component({
    selector: 'app-delete-employee',
    templateUrl: './delete-employee.component.html',
    styleUrls: ['./delete-employee.component.css'],
    providers: [Datastore]
})
 
export class DeleteEmployeeComponent {
    @Output() show_read_employees_event = new EventEmitter();
    @Input() employee_id;
 
    constructor(private  datastore: Datastore){}
 
    deleteEmployee(){
        this.datastore.deleteRecord(Employee, this.employee_id).subscribe(
            employee => {
                console.log(employee);
                this.readEmployees();
            },
            error => console.log(error)
        );
        // this.employeeService.deleteEmployee(this.employee_id)
        //     .subscribe(
        //         employee => {
        //             console.log(employee);
        //             this.readEmployees();
        //         },
        //         error => console.log(error)
        //      );
    }
 
    readEmployees(){
        this.show_read_employees_event.emit({ title: "Read Employees" });
    }
 
}
