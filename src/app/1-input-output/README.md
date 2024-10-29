## Inputs & Outputs, Setters and `ngOnChanges` lifecycle hook

<img src="/public/img/input.png" alt="Inputs and Outputs" style="width: 500px; height:auto;">

### Inputs & Outputs

The most fundamental way components communicate in Angular is through
<b>inputs</b> and <b>outputs</b>. There are several approaches to this -
both traditional and modern - which we'll explore in detail.

#### Traditional & Non-traditional Approach 

The traditional approach uses `@Input()` and `@Output()`
decorators. These allow child components to receive data and send
data back to their parents. This approach has been the standard in
Angular for years.

```typescript
@Component({
  selector: 'app-component'
})
class Component {
  // Input property to receive data from parent
  @Input()
  thisIsInputProperty = '';

  // Output event emitter to send data to parent
  @Output()
  thisIsOutputProperty = new EventEmitter<string>();
} 

// usage of input and output from parent perspective
<app-component thisIsInputProperty="value" 
               (thisIsOutputProperty)="doSomething($event)" />
```

Actually, we don't need decorators for inputs and outputs, that's why I call it non-traditional.
We can use `@Component` metadata `inputs` or `outputs` arrays and pass 
the names of variables that we want to work with as inputs or outputs. It 
will work the same way as using decorators.

| Status | Description                                                                                                                                                                     |
|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ❌ | Providing inputs and outputs via metadata properties can be harder to understand and can be inconcise.                                                                          |
| ✅ | It's the common way to communicate between components, always good to use, and recommended.                                                                                     |
| ✅ | In the newest version of Angular, you can transform data as well as in setters (that we will elaborate in the moment) with the usage of @Input decorators metadata `transform`. |

Let's take a look at non-traditional approach as well. It works the same way as with decorators but 
has different syntax.

```typescript
@Component({
  inputs: ['thisIsInputProperty'],
  outputs: ['thisIsOutputProperty']
})
class Component {
  thisIsInputProperty: string;
  thisIsOutputProperty = new EventEmitter<string>();
} 
```

#### Modern Approach with Signals
In Angular v17+ we can use signals with the `input()`
and `output()` functions instead of decorators. There is no difference
in passing the data except that we don't need to use decorators, and 
now we're working with signal approach. The signal approach in Angular v17+ offers improved performance and
better change detection, making it the recommended choice for new applications.


| Status | Description                                           |
|--------|-------------------------------------------------------|
| ❌ | Doesn't work with component inheritance.              |
| ✅ | Always good to use and recommended from Angular v17+. |


```typescript
// Example with signals.
@Component()
class Component {
  thisIsInputProperty = input<string>();
  thisIsOutputProperty = output<string>();
} 
```

#### Setter Methods
Angular provides an additional layer of control over inputs through 
setter methods. These setters are called whenever the input value 
changes, allowing you to handle the value before it's set.


| Status | Description                                          |
|--------|------------------------------------------------------|
| ❌ | Need to create additional property to set the value. |
| ❌ | More code, than inline `@Input`.                     |
| ✅ | Can perform advanced validation.                     |
| ✅ | Can transform the incoming data.                     |
| ✅ | Can trigger side effects.                            |

```typescript
// Inside of the component.
@Input()
set name(value: string) {
  console.log('New name:', value);
  this._name = value.trim();
}
```

#### Input Inheritance

In the traditional approach, there's a way for 
inheriting input and output properties from their parent component. 
While this approach is not commonly used it's always good to know, you can 
achieve that this way.

| Status | Description                                                                       |
|--------|-----------------------------------------------------------------------------------|
| ❌ | Component inheritance is rarely used in Angular, so probably you'll never use it. |
| ❌ | This approach is not compatible with the signals inputs and outputs.              |
| ✅ | Good to know more component communication techniques than less.                  |

```typescript
// Parent component.
@Component({
  selector: 'app-parent',
})
class ParentComponent {
  @Input()
  parentInput = 'hello';
}

// Child component.
@Component({
  selector: 'app-child',
  inputs: ['parentInput']
})
class ChildComponent extends ParentComponent {
  // The child now has access to 'parentInput'.
  constructor() {
    super();
    console.log(this.parentInput);
  }
}
```

Full set of examples around this topic you can find in the [1-input-output](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/1-input-output) folder.
