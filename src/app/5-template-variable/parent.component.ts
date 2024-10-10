import {Component} from "@angular/core";
import {ChildTodoListComponent} from "./child-todo-list.component";

@Component({
  selector: 'app-5-template-variable-parent',
  standalone: true,
  template: `
    <h1>5. Template Variable</h1>
    <app-5-template-variable-child-todo-list #todoList/>
    <button (click)="addTodo(todoList)">Add Todo</button>
  `,
  imports: [ChildTodoListComponent]
})
export class TemplateVariableParentComponent {
  addTodo(todoList: ChildTodoListComponent): void {
    todoList.addTodo();
  }
}
