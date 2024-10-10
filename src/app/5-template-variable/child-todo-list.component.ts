import {Component, signal} from "@angular/core";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-5-template-variable-child-todo-list',
  standalone: true,
  template: `
    <h2>Todo List</h2>
    <ul>
      @for (todo of todos(); track $index) {
        <li>{{ todo }}</li>
      }
    </ul>
  `,
  imports: [NgForOf]
})
export class ChildTodoListComponent {
  readonly todos = signal(['Learn Angular', 'Learn TypeScript', 'Build Angular App']);

  addTodo(): void {
    this.todos.set([...this.todos(), 'New Todo']);
  }
}
