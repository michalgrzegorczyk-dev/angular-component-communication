## ViewChild and ViewChildren

<img src="/public/img/img6.png" alt="Inputs and Outputs" style="width: 500px; height:auto;">


### Understanding ViewChild in Angular
`ViewChild` is a versatile Angular tool that lets parent components interact directly 
with their child components. By default, it selects the first matching element or 
component in the view, making it perfect for one-to-one parent-child communication 
through the template.


#### Practical Uses of ViewChild
1. Controlling UI components programmatically (modal dialogs, accordion panels).
2. Interacting with third-party components (maps, charts, date pickers).
3. Managing multiple similar components (tabs, carousel slides, list items).

#### Traditional approach 
The classic method uses the `@ViewChild()` decorator to connect a parent with its child component. 
You'll reference the child component's class in the decorator to establish this connection.

| Status | Description                                                                                    |
|--------|------------------------------------------------------------------------------------------------|
| ❌ | Creates tight coupling between parent and child components, which can limit reusability.            |
| ❌ | Limited to direct parent-child relationships only.                                            |
| ❌ | Extensive use of `ViewChild` can make applications harder to maintain and test.             |
| ✅ | Provides direct access to child component's public methods and properties. |
| ✅ | Enables real-time access to child component's state and behavior.                 | 


```typescript
// Child component with a method parent can call.
@Component({
  selector: 'app-child',
})
class ChildComponent {
  foo() {
    console.log('bar');
  }
}

// Parent component that controls the child.
@Component({
  selector: 'app-parent',
  template: `
    <app-child/>
    <button (click)="click()">Call Child Method</button>
  `,
  imports: [ChildComponent]
})
class ParentComponent {
  @ViewChild(ChildComponent)
  child!: ChildComponent;

  click() {
    // Calls the child component's foo method.
    this.childComponent.foo();
  }
}
```

#### Modern Signal-Based Approach
Angular 17+ introduces a cleaner way to use `ViewChild` with the `viewChild()` signal function. 
You can specify either a template reference variable or a component class to locate 
the child component.

```typescript
// Parent component using signal-based ViewChild.
@Component({
  template: `
    <app-child/>
    <button (click)="click()">Call Child Method</button>
  `,
  imports: [ChildComponent]
})
class ViewChildParentNewComponent {
  child = viewChild<ChildComponent>(ChildComponent);

  click() {
    // Calls the child component's foo method using signal syntax.
    this.child().foo(); 
  }
}
```

Full set of examples around this topic you can find in the [6-view-child](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/6-view-child) folder.
