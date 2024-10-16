# 4-template-variable

## Template Variables

Template variables are a powerful feature in Angular that enable direct 
communication between parent and child components through the template. 
They provide a way to reference elements or components in the template, 
allowing for more dynamic and interactive component interactions.

### How Template Variables Work

- Template variables are declared using the # symbol in the template.
- They can be assigned to elements, components, or directives.
- Once declared, they can be used within the template or passed to component 
methods.

### Advantages of Template Variables

- <b>Direct Access</b>: Provides a way to directly access child component methods and properties.
- <b>Simplicity</b>: Can be easier to implement than services for simple parent-child interactions.
- <b>Template-Driven</b>: Keeps the interaction logic within the template, which can be more intuitive for template-centric operations.
- <b>Flexibility</b>: Can be used with any element or component, not just for component communication.

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
    <app-4-template-variable-todo-list #todoList/>
    <button (click)="addTodo(todoList)">Add Todo</button>
  `,
  imports: [TemplateVariableTodoListComponent]
})
export class TemplateVariableParentComponent {
  addTodo(todoList: TemplateVariableTodoListComponent) {
    todoList.addTodo();
  }
}
```

### Considerations and Best Practices

Full set of examples you can find in the [src/app/4-template-variable](src/app/4-template-variable) folder.
