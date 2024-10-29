### Template Variables in Angular

<img src="/public/img/template.png" alt="x" style="width: 500px; height: auto;">

Let's talk about template variables. They're a really cool feature in Angular marked by 
the `#` symbol. Think of them as quick references you can create in your template 
to connect parent and child components. It's like giving your components nicknames 
they can use to talk to each other!

| Status | Description                                                                                                                        |
|-------|------------------------------------------------------------------------------------------------------------------------------------|
| ❌     | Limited scalability due to tight coupling between components.                                                                      |
| ❌     | Variables are only accessible within the template unless passed through events.                                                                                                                                   |
| ❌     | Timing issues can occur if accessing elements before they're rendered.                                           |
|  ✅      | Enables bi-directional communication between parent and child components within templates. |
| ✅     | Works smoothly with `ViewChild` and template functions for element access.                                |
| ✅     | Provides quick, direct access to component references.                                                                                                        |
| ✅     | Reduces boilerplate code by eliminating need for inputs, outputs, or services.                                                    |
| ✅     | Gives parent components full access to child methods and properties.                                                                            |

```typescript
// Child component with todo management.
@Component()
class TodoListComponent {
  todos = ['Learn Angular', 'Build an app'];

  addTodo() {
    this.todos.push(`New Todo ${this.todos.length + 1}`);
  }
}

// Parent component using template variable.
@Component({
  template: `
    <todo-list #todoList/>
    <button (click)="addTodo(todoList)">Add Todo</button>
  `,
  imports: [TodoListComponent]
})
class ParentComponent {
  addTodo(todoList: TodoListComponent) {
    // Access child component through template variable.
    todoList.addTodo();
  }
}
```

Full set of examples around this topic you can find in the [4-template-variable](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/4-template-variable) folder.
