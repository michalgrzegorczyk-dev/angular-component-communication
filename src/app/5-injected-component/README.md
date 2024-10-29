### Injected Components

<img src="/public/img/injected-components.png" alt="x" style="width: 500px; height: auto;">

Injecting components is very rarely used technique and personally, I haven't
seen that, but it's great discover to elaborate 😁. It allows a child component to 
access its parent component directly. This method provides a way to 
establish communication between components in a parent-child 
relationship. What you need to do is to inject one of the parent component
into the child component constructor.

| Status | Description                                                                                                                                                                |
|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ❌ | Not widely used in real-world applications, therefore can be misleasing.                                                                                                   ||
| ❌ | Makes components tightly coupled.                                                                                                                                          |
| ❌ | Only allow communication one-way, parent can be used in child component.                                                                                                   |
| ❌ | Can only inject components that are part of the direct parent hierarchy.                                                                                                   |
| ✅ | For very specific cases, this technique can simplify communication between tightly related components by eliminating the need for intermediate services or event emitters. |
| ✅ | Allow a child component to call methods or access properties directly from the parent component.                                                                           |


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

Full set of examples around this topic you can find in the [5-injected-component](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/5-injected-component) folder.
