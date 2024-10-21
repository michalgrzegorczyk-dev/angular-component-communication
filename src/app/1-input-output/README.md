## Inputs & Outputs, Setters and OnChanges

<img src="/public/img/input.png" alt="x" style="width: 500px; height:auto;">

### 1. Inputs & Outputs

The most fundamental way of enabling communication between components
in Angular is through the use of <b>Input</b> and <b>Output</b> functionality.
It can be achieved in many ways, old and new, most common and less known, 
directly and indirectly. All scenarios will be covered but for now let's start 
with the basics.

#### Traditional & Non-traditional Approach 

The traditional approach involves using `@Input()` and `@Output()` 
decorators that allows a child components to receive passed data and enables
child components to send data back to its parents. This approach has been 
a used in Angular development for years and is the most basic way to 
communicate between components.

```typescript
// Example of inputs and outputs without using decorators.
@Component()
class Component {
  thisIsInputProperty = '';
  thisIsOutputProperty = new EventEmitter<string>();
} 
```

Actually, we don't need decorators for inputs and outputs, did you know it?
We can use `@Component` metadata `inputs` or `outputs` arrays and pass 
the names of variables that we want to work as inputs or outputs. It 
will work the same way as using decorators.

| Status | Description                                                                                                                          |
|--------|--------------------------------------------------------------------------------------------------------------------------------------|
| ❌ | Approach with providing inputs and outputs via metadata properties can be harder to understand for not experienced Angular Developers ||
| ✅ | Most common way to communicate between components                                                                                    |
| ✅ | In newest version of Angular, you can transform data as well in inline @Input decorators                                             | |
| ✅ | Always good to use                                                                                                                   | |


```typescript
// Example of inputs and outputs without using decorators.
@Component({
  inputs: ['thisIsInputProperty'],
  outputs: ['thisIsOutputProperty']
})
class Component {
  thisIsInputProperty: string;
  thisIsOutputProperty = new EventEmitter<string>();
} 
```
#### 2. Modern Approach with Signals

With newer versions of Angular, we can now use signals with the `input()`
and `output()` functions instead of decorators. There is no difference
in passing the data except that we don't need to use decorators and 
now we're working with signals.


| Status | Description                            |
|--------|----------------------------------------|
| ❌ | Doesnt work with component inheritance ||
| ✅ | Except above, always good to use       | |


```typescript
// Example of inputs and outputs without using decorators.
@Component({
})
class Component {
  thisIsInputProperty = input<string>();
  thisIsOutputProperty = output<string>();
} 
```

#### Setter Methods

Angular provides an additional layer of control over inputs through 
setter methods. These setters are called whenever the input value 
changes, allowing you to:


| Status | Description                                               |
|--------|-----------------------------------------------------------|
| ❌ | Need to create aditional property to show value           |
| ❌ | More code, than inline @Input                             |
| ✅ | Perform advanced validation                               |
| ✅ | Transform the incoming data                               |
| ✅ | Trigger side effects                                      |

```typescript
@Input()
set name(value: string) {
  console.log('New name:', value);
  this._name = value.trim();
}
```

#### Input Inheritance

In the traditional approach, there's an interesting technique for 
inheriting input and output properties from a parent component. 
While not commonly used it's always good to know more than less.
Also, it's important to note that this inheritance method is not compatible 
with the signals approach.

| Status | Description                                           |
|--------|-------------------------------------------------------|
| ❌ | Component inheritance is rarely used in Angular       |
| ❌ | This approach is not compatible with the signals approach |
| ✅ | Good to know more than less                           |

```typescript
// parent component
@Component({
  selector: 'app-parent',
})
export class ChildComponent extends ParentComponent {
  @Input()
  parentInput: string;
}

// child component
@Component({
  selector: 'app-child',
  inputs: ['parentInput']
})
export class ChildComponent extends ParentComponent {
  // The child now has access to 'parentInput'
}
```

Full set of examples around this topic you can find in the [1-input-output](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/1-input-output) folder.
