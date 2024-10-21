### View Children
As we know already how View Child works, let's take a look at View Children.
ViewChildren allows a parent component to query and interact with multiple 
child components or elements in its template. It's similar to `@ViewChild`,
but it returns a`QueryList` of elements or components instead of a first element.

#### Traditional Approach
The traditional method involves using `@ViewChildren()` decorator to access
child components directly from the parent. This allows the parent to interact
with the child components' methods and properties through the template.

```typescript
// parent component
@Component({
  selector: 'app-parent',
  template: `
    @for (val of [1, 2, 3]; track $index) {
      <app-7-child/>
    }
    <button (click)="click()">Call Child Methods</button>
  `,
  imports: [ChildComponent]
})
class ParentComponent {
  @ViewChildren(ChildComponent) children!: QueryList<ChildComponent>;

  click() {
    this.children.forEach(child => child.foo());
  }
}

// child component
@Component({
  selector: 'app-child',
})
class ChildComponent {
  foo() {
    console.log('bar');
  }
}
```

#### Modern Approach with Signals
In Angular v17+ there is a new way to use`@ViewChildren` feature, with signal 
approach `viewChildren()`. Everything works the same as with the traditional
approach, but with signals, we can access the child components in a more
straightforward way.

```typescript
// parent component
@Component({
  selector: 'app-parent',
  template: `
    @for (val of [1, 2, 3]; track $index) {
      <app-7-child/>
    }
    <button (click)="click()">Call Child Methods</button>
  `,
  imports: [ChildComponent]
})
export class ParentComponent {
  childrenNew = viewChildren<ChildComponent>(ChildComponent);

  click() {
    this.childrenNew().forEach(child => child.foo());
  }
}

// child component
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
