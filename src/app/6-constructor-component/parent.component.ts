import {Component} from "@angular/core";
import {ChildTodoListComponent} from "./child-todo-list.component";

@Component({
  selector: 'app-6-constructor-component-parent',
  standalone: true,
  template: `
    <h1>6. Constructor Component</h1>
    <app-6-constructor-component-child-todo-list/>
  `,
  imports: [ChildTodoListComponent]
})
export class ConstructorComponentParentComponent {
  displayNotification(): void {
    alert('Notification');
  }
}
