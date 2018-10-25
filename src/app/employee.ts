import { JsonApiModelConfig, JsonApiModel, JsonApiMetaModel, Attribute, BelongsTo } from 'angular2-jsonapi';
import { Department } from './department';

@JsonApiModelConfig({
    type: 'employees',
    meta: JsonApiMetaModel
})
export class Employee extends JsonApiModel {

    @Attribute()
    id: string;

    @Attribute()
    name: string;

    @Attribute()
    active: boolean;

    @BelongsTo()
    department: Department;
}
