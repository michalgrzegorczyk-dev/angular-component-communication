### Injected Components in Angular

<img src="/public/img/injected-components.png" alt="x" style="width: 500px; height: auto;">

Let's explore an interesting but rarely-used technique of component injection! 
This approach lets a child component directly access its parent by injecting the 
parent component into the child's constructor. While not common, it's worth understanding 
for specific use cases.

| Status | Description                                                                                                                                                                |
|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ❌ | Rare in real-world applications, which may make the code less maintainable for teams.                                                                                                 |
| ❌ | Creates strong dependencies between components, reducing reusability.                                                                                                                                        |
| ❌ | Limited to one-way communication from child to parent.                                                                                                  |
| ❌ | Only works with direct parent components in the hierarchy.                                                                                                 |
| ✅ | Simplifies parent-child communication in specific cases without extra services. |
| ✅ | Provides direct access to parent methods and properties from the child component.                                                                           |


```typescript
// Parent component that child can access.
@Component()
class ParentComponent {
  foo() {
    alert('bar');
  }
}

// Child component with injected parent.
class ChildComponent {
  constructor(private parentComponent: ParentComponent) {
    this.parentComponent.foo(); // Direct access to parent's methods.
  }
}
```

Full set of examples around this topic you can find in the [5-injected-component](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/5-injected-component) folder.
