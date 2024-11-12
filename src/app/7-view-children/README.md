### Understanding ViewChildren in Angular
Building on our knowledge of `ViewChild` comes its sibling feature, `ViewChildren`.
This robust tool lets a parent component work with multiple 
child components or elements in its template. While ViewChild gives you one 
element, `ViewChildren` provides a `QueryList` containing all matching elements.

#### Practical Uses of ViewChildren
1. Managing dynamic lists of components (todo items, form fields, list items).
2. Managing form array elements for dynamic forms.
3. Controlling multiple tab panels or accordion sections.

#### Traditional Approach
The classic method uses the `@ViewChildren()` decorator to access multiple 
child components from the parent. You'll reference the 
child component's class in the decorator - it's similar to `ViewChild` but gives 
you access to all instances instead of just one.

```typescript
// Parent component that manages multiple children.
@Component({
  selector: 'app-parent',
  template: `
    @for (val of [1, 2, 3]) {
      // Child components we want to access.
      <app-child/>
    }
    <button (click)="click()">Call Child Methods</button>
  `,
  imports: [ChildComponent]
})
class ParentComponent {
  @ViewChildren(ChildComponent) 
  children!: QueryList<ChildComponent>;

  click() {
    this.children.forEach(child => child.foo());
  }
}

// Child component with method that parent can call.
@Component({
  selector: 'app-child',
})
class ChildComponent {
  foo() {
    console.log('bar');
  }
}
```

#### Modern Signal-Based Approach
Angular 17+ introduces a cleaner way to use `ViewChildren` with the `viewChildren()` 
signal function. It works the same way but leverages Angular's reactive signal 
system for better performance and cleaner code.

```typescript
// Parent component using signal-based ViewChildren.
@Component({
  selector: 'app-parent',
  template: `
    @for (val of [1, 2, 3]) {
      <app-child/>
    }
    <button (click)="click()">Call Child Methods</button>
  `,
  imports: [ChildComponent]
})
class ParentComponent {
  childrenNew = viewChildren<ChildComponent>(ChildComponent);

  click() {
    this.childrenNew().forEach(child => child.foo());
  }
}

// Parent component using signal-based ViewChildren.
@Component({
  selector: 'app-child',
  template: `<h2>app-child</h2>`,
})
class ChildComponent {
  foo() {
    console.log('bar');
  }
}
```

Full set of examples around this topic you can find in the [src/app/7-view-children](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/src/app/7-view-children) folder.

---
