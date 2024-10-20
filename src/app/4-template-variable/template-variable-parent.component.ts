import {Component} from "@angular/core";
import {TemplateVariableTodoListComponent} from "./template-variable-todo-list.component";

@Component({
  selector: 'app-4-template-variable-parent',
  standalone: true,
  template: `
    <h1>app-4-template-variable-parent</h1>
    <app-4-template-variable-todo-list #todoList/>
    <button (click)="addTodo(todoList)">Add Todo</button>
  `,
  imports: [TemplateVariableTodoListComponent]
})
export class TemplateVariableParentComponent {
  addTodo(todoList: TemplateVariableTodoListComponent): void {
    todoList.addTodo();
  }
}
