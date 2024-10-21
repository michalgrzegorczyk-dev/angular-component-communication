## ViewChild and ViewChildren
<img src="/public/img/view-child.png" alt="x" style="width: 500px; height: auto;">

### View Child
Yet, another powerful tool in Angular that allows a parent component 
to access and interact with its child components directly. This technique 
provides a way to establish communication between components in a 
parent-child relationship through the template. By default, ViewChild feature in 
Angular selects the <b>first</b> matching element or component in the view.

#### Traditional approach 
The traditional method uses `@ViewChild()` to access a child component directly 
from the parent. This allows the parent to interact with the child component's
methods and properties through the template.

| Status | Description                                                                                    |
|--------|------------------------------------------------------------------------------------------------|
| ❌ | Strong dependency between parent and child, reducing reusability and flexibility.              ||
| ❌ | Only works for direct parent-child relationships, not across siblings or unrelated components.              ||
| ❌ | Overusing @ViewChild() in large apps can make the structure harder to maintain.              ||
| ✅ | Allows the parent to directly access and control the child component's methods and properties. |
| ✅ | The parent can access the latest state of the child component whenever needed.                 | |


```typescript
// child component
@Component({
  selector: 'app-6-child',
})
class ChildComponent {
  foo() {
    console.log('bar');
  }
}

// parent component
@Component({
  selector: 'app-6-parent',
  template: `
    <app-6-view-child/>
    <button (click)="click()">Call Child Method</button>
  `,
  imports: [ChildComponent]
})
class ParentComponent {
  @ViewChild(ChildComponent)
  child!: ChildComponent;

  click() {
    // runs foo method from child component
    this.childComponent.foo();
  }
}
```

#### Modern Approach with Signals
In Angular v17+, there is a new way to use ViewChild feature, with signals `viewChild()`.
In this case we need to specify the string that indicates the template reference variable
of the child component. This way we can access the child component directly from the parent.

```typescript
@Component({
  selector: 'app-6-parent',
  template: `
    <app-6-child #child/>
    <button (click)="click()">Call Child Method</button>
  `,
  imports: [ChildComponent]
})
class ViewChildParentNewComponent {
  child = viewChild<ChildComponent>('child');

  click() {
    // runs foo method from child component
    this.child().foo(); 
  }
}
```

Full set of examples around this topic you can find in the [6-view-child](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/6-view-child) folder.
