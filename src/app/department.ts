import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany } from 'angular2-jsonapi';

@JsonApiModelConfig({
    type: 'departments'
})
export class Department extends JsonApiModel {

    @Attribute()
    id: string;

    @Attribute()
    name: string;
}
