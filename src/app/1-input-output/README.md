## Input and Output Decorators

The most fundamental way of enabling communication between components in Angular is through the use of `@Input()` and `@Output()` decorators.

- `@Input()` allows a child component to receive data from its parent.
- `@Output()` enables a child component to send data back to its parent.

To implement this communication:

1. Add `@Input()` and `@Output()` decorators to properties in the child component.
2. Pass data from the parent component to these decorated properties.

### Two Approaches to Component Communication

#### 1. Traditional Approach

The traditional method involves using `@Input()` and `@Output()` decorators as
described above. This approach has been a used in Angular development for 
years and is widely understood.

#### 2. Modern Approach with Signals

With newer versions of Angular, we can now use signals with the `input()`
and `output()` function instead of decorators.

### Setter Methods

Angular provides an additional layer of control over inputs through setter methods. These setters are called whenever the input value changes, allowing you to:

- Perform validation
- Transform the incoming data
- Trigger side effects based on new input values

Here's a quick example:

```typescript
@Input()
set name(value: string) {
  console.log('New name:', value);
  this._name = value.trim();
}

get name(): string {
  return this._name;
}
```

### Input Inheritance

In the traditional approach, there's an interesting technique for inheriting input properties from a parent component. 
While not commonly used, it's a powerful feature to be aware of. It's important to note that this inheritance method is not compatible with the signals approach.


1. Extend the parent component in your child component.
2. Use the `inputs` array in the `@Component` decorator to specify which inputs to inherit.

Example:

```typescript
@Component({
  selector: 'app-child',
  template: '...',
  inputs: ['parentInput']
})
export class ChildComponent extends ParentComponent {
  // The child now has access to 'parentInput'
}
```

Full set of examples you can find in the [src/app/1-input-output](1-input-output) folder.
