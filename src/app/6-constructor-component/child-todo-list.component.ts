import {Component, signal} from "@angular/core";
import {NgForOf} from "@angular/common";
import {ConstructorComponentParentComponent} from "./parent.component";

@Component({
  selector: 'app-6-constructor-component-child-todo-list',
  standalone: true,
  template: `
    <h2>Todo List</h2>
    <ul>
      @for (todo of todos(); track $index) {
        <li>{{ todo }}</li>
      }
    </ul>

    <button (click)="addTodo()">Add Todo</button>
  `,
  imports: [NgForOf]
})
export class ChildTodoListComponent {
  readonly todos = signal(['Learn Angular', 'Learn TypeScript', 'Build Angular App']);

  constructor(private constructorComponentParentComponent: ConstructorComponentParentComponent) {
  }

  addTodo(): void  {
    this.todos.set([...this.todos(), 'New Todo']);
    this.constructorComponentParentComponent.displayNotification();
  }
}
