### 4. Template Variables

<img src="/public/img/template.png" alt="x" style="width: 500px; height: auto;">

Template variables are a powerful feature in Angular that let parent and child 
components communicate directly through the template by using special sign `#`. 
They allow to reference elements or components within the template,
making it easier to create dynamic and interactive interactions between components. 


| Status | Description                                                           |
|--------|-----------------------------------------------------------------------|
| ❌ | Not scalable, creates tightly coupled components                      |
| ❌ | Only accessible within the template                                   |
| ❌ | Only allow communication one-way, from parent to child                |
| ✅ | Simple and direct access                                              |
| ✅ | No need for extra code for inputs, outputs or services to communicate |
| ✅ | Parent can call child methods                                         |



```typescript
// child component
class TodoListComponent {
  todos = ['Learn Angular', 'Build an app'];

  addTodo() {
    this.todos.push(`New Todo ${this.todos.length + 1}`);
  }
}

// parent component
@Component({
  template: `
    <todo-list #todoList/>
    <button (click)="addTodo(todoList)">Add Todo</button>
  `,
  imports: [TodoListComponent]
})
class TodoListComponent {
  addTodo(todoList: TodoListComponent) {
    todoList.addTodo();
  }
}
```

Full set of examples around this topic you can find in the [4-template-variable](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/4-template-variable) folder.
