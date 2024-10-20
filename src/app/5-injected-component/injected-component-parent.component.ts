import {Component} from "@angular/core";
import {InjectedComponentTodoListComponent} from "./injected-component-todo-list.component";

@Component({
  selector: 'app-5-injected-component-parent',
  standalone: true,
  template: `
    <h1>app-5-injected-component-parent</h1>
    <app-5-injected-component-todo-list/>
  `,
  imports: [InjectedComponentTodoListComponent]
})
export class InjectedComponentParentComponent {
  displayNotification(): void {
    alert('Notification');
  }
}
