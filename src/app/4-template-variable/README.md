## 4-template-variable

![x](/public/img/template.png)

### Template Variables

Template variables are a powerful feature in Angular that enable direct 
communication between parent and child components through the template. 
They provide a way to reference elements or components in the template, 
allowing for more dynamic and interactive component interactions. 
For example, you can use template variables to access child component
and invoke its methods from the parent component.

#### How Template Variables Work

- Template variables are declared using the # symbol in the template.
- They can be assigned to elements, components, or directives.

#### Example 
Let's examine an example where we use a template variable to communicate 
between a parent component and a child TodoListComponent.

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
export class TodoListComponent {
  addTodo(todoList: TodoListComponent) {
    todoList.addTodo();
  }
}
```

Full set of examples you can find in the [src/app/4-template-variable](src/app/4-template-variable) folder.
