## Inputs & Outputs, Setters and `ngOnChanges` Lifecycle Hook

<img src="/public/img/input.png" alt="Inputs and Outputs" style="width: 500px; height:auto;">

### Inputs & Outputs in Angular

Let's explore the fundamental ways components talk to each other in Angular - through 
inputs and outputs! We'll look at both traditional and modern 
approaches to handle this communication.

#### Traditional Approach with Decorators

The classic way uses `@Input()` and `@Output()` decorators, letting 
child components receive data and send it back to their parents. 
This method has been an Angular standard for years.

```typescript
// Component with traditional input/output.
@Component({
  selector: 'app-component'
})
class Component {
  // Receives data from parent.
  @Input()
  thisIsInputProperty = '';

  // Sends data to parent.
  @Output()
  thisIsOutputProperty = new EventEmitter<string>();
}

// Using in parent template.
<app-component thisIsInputProperty="value" 
               (thisIsOutputProperty)="doSomething($event)" />
```

#### Alternative Non-Decorator Approach
Here's something interesting - we don't actually need decorators for inputs and outputs!
There's a non-traditional way using `@Component` metadata with `inputs` or `outputs` arrays.
It achieves the same result with a different syntax.

| Status | Description                                                                                                                                                                     |
|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ❌ | Providing inputs and outputs via metadata properties can be harder to understand and can be less concise.                                                                          |
| ✅ | It's the standard way to communicate between components, well-tested and recommended.                                                                                     |
| ✅ | The newest Angular version lets you transform data through `@Input` decorator's metadata `transform`, similar to setters. |


```typescript
// Component using metadata for inputs/outputs.
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
Angular 17+ introduces a powerful new way using signals with `input()` and `output()`
functions. This approach offers better performance and smarter change detection, 
making it the go-to choice for new applications.


| Status | Description                                           |
|--------|-------------------------------------------------------|
| ✅ | Always good to use and recommended from Angular v17+. |
| ✅ | Provides improved performance and change detection. |


```typescript
// Modern signal-based approach.
@Component()
class Component {
  thisIsInputProperty = input<string>();
  thisIsOutputProperty = output<string>();
} 
```

#### Setter Methods
Want more control over your inputs? Angular's setter 
methods let you intercept and handle input values before they're set.


| Status | Description                                          |
|--------|------------------------------------------------------|
| ❌ | Requires additional property for storing the value. |
| ❌ |More verbose than simple `@Input` declarations.                |
| ✅ | Enables input validation on the fly.                    |
| ✅ | Allows data transformation as values come in.                     |
| ✅ | Can trigger side effects when values change.                          |

```typescript
// Example of input setter usage.
@Input()
set name(value: string) {
  console.log('New name:', value);
  this._name = value.trim();
}
```

#### Input Inheritance

While not common, Angular supports inheriting input and output properties from parent components.

| Status | Description                                                                       |
|--------|-----------------------------------------------------------------------------------|
| ❌ | Component inheritance is rarely used in Angular, so you may never need this. |
| ❌ | Not compatible with the new signals inputs and outputs approach.             |
| ✅ | Adds to your toolkit of component communication techniques.                 |

```typescript
// Parent component with input.
@Component({
  selector: 'app-parent',
})
class ParentComponent {
  @Input()
  parentInput = 'hello';
}

// Child component inheriting parent's input.
@Component({
  selector: 'app-child',
  inputs: ['parentInput']
})
class ChildComponent extends ParentComponent {
  // Child gets access to parentInput.
  constructor() {
    super();
    console.log(this.parentInput);
  }
}
```

Full set of examples around this topic you can find in the [1-input-output](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/1-input-output) folder.
