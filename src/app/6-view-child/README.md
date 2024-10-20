## View Child

![x](/public/img/view-child.png)

`@ViewChild` is a powerful decorator in Angular that allows a parent component 
to access and interact with its child components directly. This technique 
provides a way to establish communication between components in a 
parent-child relationship through the template. 

### 1. Traditional Approach
The traditional method involves using `@ViewChild()` decorator as described above.

### 2. Modern Approach with Signals
In Angular v17+, there is a
new way to use ViewChild feature, with signals `viewChild()`.

### How ViewChild Works

- The parent component uses the `@ViewChild` decorator to query its template for a 
- child component.
- The query can be based on the child component's class or a template reference variable.
- Once the view is initialized (in the ngAfterViewInit lifecycle hook), Angular assigns the 
child component instance to a property in the parent.
- The parent can then access public properties and methods of the child component.
// todo do we need #?

Let's take a look at the code example:

```typescript
// parent component
@Component({
  template: `
    <app-child #viewChildChildComponent/>
    <button (click)="click()">Call Child Method</button>
  `,
  imports: [ChildComponent]
})
class ParentComponent {
  // old way of using ViewChild
  @ViewChild(ChildComponent)
  childComponentOld!: ChildComponent;

  // new way with signals of using ViewChild
  childComponentNew = viewChild.required<ViewChildChildComponent>('viewChildChildComponent');

  click() {
    this.childComponentOld.foo();
    this.childComponentNew().foo();
  }
}

// child component
@Component({
  selector: 'app-6-child',
})
class ChildComponent {
  foo() {
    console.log('bar');
  }
}
```

Full set of examples you can find in the [src/app/6-view-child](src/app/6-view-child) folder.
