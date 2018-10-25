import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany } from 'angular2-jsonapi';
// import { Employee } from './employee.model';

@JsonApiModelConfig({
    type: 'departments'
})
export class Department extends JsonApiModel {

    @Attribute()
    id: string;

    @Attribute()
    name: string;

	  // @HasMany()
	  // employee: Employee;
}
