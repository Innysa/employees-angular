import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	title = 'Read Employees';
	employee_id;

	show_read_employees_html=true;
	show_create_employee_html=false;
	show_get_employee_html=false;
	show_update_employee_html=false;
	show_delete_employee_html=false;
	
	showCreateEmployee($event){

	    this.title=$event.title;

	    this.hideAll_Html();
	    this.show_create_employee_html=true;
	}
	 
	showReadEmployees($event){
	    this.title=$event.title;
	 
	    this.hideAll_Html();
	    this.show_read_employees_html=true;
	}

	showGetEmployee($event){
 
	    this.title=$event.title;
	    this.employee_id=$event.employee_id;
	 
	    this.hideAll_Html();
	    this.show_get_employee_html=true;
	}

	showUpdateEmployee($event){
	 
	    this.title=$event.title;
	    this.employee_id=$event.employee_id;
	 
	    this.hideAll_Html();
	    this.show_update_employee_html=true;
	}
	
	showDeleteEmployee($event){
 
	    this.title=$event.title;
	    this.employee_id=$event.employee_id;
	 
	    this.hideAll_Html();
	    this.show_delete_employee_html=true;
	}
	 
	hideAll_Html(){

	    this.show_read_employees_html=false;
	    this.show_get_employee_html=false;
	    this.show_create_employee_html=false;
	    this.show_update_employee_html=false;
	    this.show_delete_employee_html=false;
	}
}
