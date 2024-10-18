import {Component, signal} from "@angular/core";
import {NgForOf} from "@angular/common";
import {InjectedComponentContainer} from "./injected-component-container.component";

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

  constructor(private readonly constructorComponentParentComponent: InjectedComponentContainer) {
  }

  addTodo(): void {
    this.todos.set([...this.todos(), 'New Todo']);
    this.constructorComponentParentComponent.displayNotification();
  }
}
