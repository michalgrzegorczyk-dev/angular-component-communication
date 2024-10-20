import {Component, signal} from "@angular/core";
import {NgForOf} from "@angular/common";
import {InjectedComponentParentComponent} from "./injected-component-parent.component";

@Component({
  selector: 'app-5-injected-component-todo-list',
  standalone: true,
  template: `
    <h2>app-5-injected-component-todo-list</h2>
    <ul>
      @for (todo of todos(); track $index) {
        <li>{{ todo }}</li>
      }
    </ul>

    <button (click)="addTodo()">Add Todo</button>
  `,
  imports: [NgForOf]
})
export class InjectedComponentTodoListComponent {
  readonly todos = signal(['Learn Angular', 'Learn TypeScript', 'Build Angular App']);

  constructor(private readonly constructorComponentParentComponent: InjectedComponentParentComponent) {
  }

  addTodo(): void {
    this.todos.set([...this.todos(), 'New Todo']);
    this.constructorComponentParentComponent.displayNotification();
  }
}
