### Injected Components

<img src="/public/img/injected-components.png" alt="x" style="width: 300px; height: auto;">

Injecting components is an advanced technique in Angular that
allows a child component to access its parent 
component directly. This method provides a powerful way to 
establish communication between components in a parent-child 
relationship.

#### How Injected Components Work
- The child component declares the parent component as a dependency in its constructor.
- The child can then access public properties and methods of the parent.

#### Important Considerations
- This technique only works within the component hierarchy. A child can only inject its direct parent or an ancestor in its component tree.
- It's not possible to inject "random" components that are not in the direct lineage.
- This approach can lead to tight coupling between components, so it should be used judiciously.
- Also, this technique is a showcase and from my observation is not widely used in real-world applications.

Let's examine an example of how to implement this technique:
```typescript
// parent component
@Component({
  template: `<app-child-component/>`,
})
class ParentComponent {
  foo() {
    alert('bar');
  }
}

// child component
class ChildComponent {
  constructor(private parentComponent: ParentComponent) {
    this.parentComponent.foo(); // <- calling foo method from child component
  }
}
```

Full set of examples you can find in the [src/app/5-injected-component](src/app/5-injected-component) folder.
