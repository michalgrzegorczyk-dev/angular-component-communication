### View Children
As we already know how `ViewChild` works, let's take a look at `ViewChildren` now.
`ViewChildren` functionality allows parent component to query and interact with multiple 
child components or elements in its template. It's very similar to `@ViewChild()` decorator,
but it returns a`QueryList` of elements or components instead of only the first element.

#### Traditional Approach
The traditional method involves using `@ViewChildren()` decorator to access
child components directly from the parent. What you need to do is to access child
component by its class and adjust `@ViewChildren()` decorator to the child component class.
Let's see how it works in the example below, and you will understand it immediately
because you already understood how it works with `@ViewChild()` 😁.

```typescript
// parent component
@Component({
  selector: 'app-parent',
  template: `
    @for (val of [1, 2, 3]) {
      // our child components that we want to access
      <app-7-child/>
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
    @for (val of [1, 2, 3]) {
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
