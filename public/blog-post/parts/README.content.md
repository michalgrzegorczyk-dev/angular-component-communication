## Inputs & Outputs, Setters and OnChanges

<img src="/public/img/input.png" alt="x" style="width: 500px; height:auto;">

### Inputs & Outputs

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
@Component()
class Component {
  @Input()
  thisIsInputProperty = '';
  
  @Output()
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

With newer versions of Angular, we can now use signals with the `input()`
and `output()` functions instead of decorators. There is no difference
in passing the data except that we don't need to use decorators and 
now we're working with signals.


| Status | Description                            |
|--------|----------------------------------------|
| ❌ | Doesnt work with component inheritance ||
| ✅ | Except above, always good to use       | |


```typescript
@Component()
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


### `ngOnChanges` Lifecycle Hook

Angular offers another way to handle input changes: the `ngOnChanges` 
lifecycle hook. This method runs when a component's input 
properties change. It's similar to input setter methods but more powerful.

| Status | Description                                                                 |
|--------|-----------------------------------------------------------------------------|
| ❌ | Runs for every input change, which may impact performance if overused.      |
| ❌ | Triggers for any input change, even if you only care about specific inputs. |
| ❌ | Need to hold additional property to show it on the view                     |
| ✅ | It can handle multiple inputs at once                                       |
| ✅ | It lets you check if it's the first change                                  | |
| ✅ | You can compare new and old values.                                         | |

```typescript
@Component()
class Component implements OnChanges {
  input1 = input('initial');
  value = signal('');

  ngOnChanges(changes: SimpleChanges) {
    if (changes['input1'].isFirstChange()) {
      console.log(changes['input1'].currentValue);
    } else {
      console.log(changes['input1'].previousValue);
      console.log(changes['input1'].currentValue);
      this.value.set(changes['input1'].currentValue);
    }
  }
}
```

Full set of examples around this topic you can find in the [2-input-ng-on-changes](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/2-input-ng-on-changes) folder.


### Services

<img src="/public/img/services.png" alt="x" style="width: 500px; height: auto;">

Services in Angular provide a powerful way to share data and 
functionality across components. They represent the third major approach 
of component communication, alongside inputs/outputs and the `ngOnChanges` 
lifecycle hook.

While services can be a complex topic, we'll focus on the 
most common and straightforward approach, which is providing a service at 
the root level and focus on how we can communicate between components.

The most common way to use services in Angular is by using BehaviorSubject and
Observable, or with the newer signals. A service can store a value, and any 
component that needs to use or update that value can subscribe to it. Components 
can also send new values to the service.

In newer versions of Angular, signals make this process easier. Signals are a 
simpler way to work with observables, making it easier to subscribe to and update 
values in a more straightforward way.

| Status | Description                                                            |
|--------|------------------------------------------------------------------------|
| ❌ | Requires understanding of dependency injection and (often) observables |
| ❌ | Can introduce additional complexity for simple applications            |
| ❌ | Requires understanding of RxJS or signals to handle data properly      |
| ✅ | Allow components to communicate without direct dependencies            |
| ✅ | Can be used across multiple components                                 |


```typescript
// service
@Injectable({
  providedIn: 'root'
})
class NewService {
  value = signal('initial');

  setValue(value: string) {
    this.value.set(value);
  }
}

// component
class ServiceComponent {
  service = inject(NewService);
  valueFromService = this.service.value;
  
  setValue(value: string) {
    this.service.setValue(value);
  }
}
```

Full set of examples around this topic you can find in the [3-service](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/3-service) folder.


### Template Variables

<img src="/public/img/template.png" alt="x" style="width: 500px; height: auto;">

Template variables are a powerful feature in Angular that let parent and child 
components communicate directly through the template by using special sign `#`. 
They allow to reference elements or components within the template,
making it easier to create dynamic and interactive interactions between components. 


| Status | Description                                                           |
|--------|-----------------------------------------------------------------------|
| ❌ | Not scalable, creates tightly coupled components                      |
| ❌ | Only accessible within the template                                   |
| ❌ | Only allow communication one-way, from parent to child                |
| ✅ | Simple and direct access                                              |
| ✅ | No need for extra code for inputs, outputs or services to communicate |
| ✅ | Parent can call child methods                                         |



```typescript
// child component
class TodoListComponent {
  todos = ['Learn Angular', 'Build an app'];

  addTodo() {
    this.todos.push(`New Todo ${this.todos.length + 1}`);
  }
}

// parent component
@Component({
  template: `
    <todo-list #todoList/>
    <button (click)="addTodo(todoList)">Add Todo</button>
  `,
  imports: [TodoListComponent]
})
class TodoListComponent {
  addTodo(todoList: TodoListComponent) {
    todoList.addTodo();
  }
}
```

Full set of examples around this topic you can find in the [4-template-variable](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/4-template-variable) folder.


### Injected Components

<img src="/public/img/injected-components.png" alt="x" style="width: 500px; height: auto;">

Injecting components is rarely used technique and personally, I haven't
seen that, but it's great discover to elaborate. It allows a child component to 
access its parent component directly. This method provides a way to 
establish communication between components in a parent-child 
relationship. What you need to do is to inject one of the parent component
into the child component constructor.


| Status | Description                                                                                                                                                               |
|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ❌ | Not widely used in real-world applications                                                                                                                                ||
| ❌ | Makes components tightly coupled                                                                                                                                          |
| ❌ | Only allow communication one-way, from parent to child                                                                                                                    |
| ❌ | Can only inject components that are part of the direct parent hierarchy                                                                                                   |
| ✅ | For very specific cases, this technique can simplify communication between tightly related components by eliminating the need for intermediate services or event emitters |
| ✅ | Allow a child component to call methods or access properties directly from the parent component                                                                           |


```typescript
// parent component
@Component({
  template: `<app-child-component/>`,
})
class ParentComponent {
  foo() {
    alert('bar');
  }
}

// child component
class ChildComponent {
  constructor(private parentComponent: ParentComponent) {
    this.parentComponent.foo(); // <- calling foo method from child component
  }
}
```

Full set of examples around this topic you can find in the [5-injected-component](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/5-injected-component) folder.


## ViewChild and ViewChildren
<img src="/public/img/view-child.png" alt="x" style="width: 500px; height: auto;">

### View Child
Yet, another big tool in Angular that allows a parent component 
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
    <app-6-child/>
    <button (click)="click()">Call Child Method</button>
  `,
  imports: [ChildComponent]
})
class ViewChildParentNewComponent {
  child = viewChild<ChildComponent>(ChildComponent);

  click() {
    // runs foo method from child component
    this.child().foo(); 
  }
}
```

Full set of examples around this topic you can find in the [6-view-child](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/6-view-child) folder.


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


## Routing Params & Queries

<img src="/public/img/router.png" alt="x" style="width: 500px; height: auto;">

### Routing Parameters

Routing parameters provide a strong way to pass data between components in 
Angular applications. This method is particularly useful when you need to 
share information across different views or components that are not 
directly related in the component tree.

#### How Routing Parameters Work
1. Parameters are defined in the route configuration and routes should be passed 
to `provideRouter(routes)` function or in RouterModule (old approach).
2. When navigating to a route, you can pass values for these parameters.
3. The component associated with the route can then access these parameters.

| Status | Description                                                                                                                     |
|--------|---------------------------------------------------------------------------------------------------------------------------------|
| ❌ | Routing params are always strings, so you may need to parse or convert complex data types.                                      ||
| ❌ | Params are primarily for passing simple data; handling large or complex data structures through URLs can be cumbersome.         ||
| ❌ | Sensitive data passed through the URL can be visible and prone to tampering.                                                    ||
| ✅ | Allows passing data between components without direct parent-child relationships, enabling more flexible component interaction. |
| ✅ | Data in URL params is preserved during navigation and can be shared easily through links.                                       | |
| ✅ | Components can easily access params via Angular’s ActivatedRoute service.                                                       | |



```typescript
// app.config.ts
const routes = [
  { path: 'details/:id', component: ChildComponent },
];

const appConfig = {
  providers: [provideRouter(routes)]
};

// parent component
@Component({
  selector: 'app-parent',
  template: `<router-outlet/>`,
  imports: [RouterOutlet]
})
class ParentComponent {
  router = inject(Router);

  goToDetails() {
    this.router.navigate(['/details', '123']);
  }
}

// child component
@Component({
  selector: 'app-child',
  template: `{{ id() }}`,
})
class ChildComponent implements OnInit {
  id = signal('foo');
  activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id.set(params['id']); // <- returns '123'
    });
  }
}
```

Full set of examples around this topic you can find in the [src/app/8-routing-param](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/src/app/8-routing-param) folder.




### Routing Queries 

Routing queries provide a flexible way to pass optional data between
components in Angular applications. Unlike route parameters, which are part of
the route path, query parameters are appended to the URL after a question
mark `?`, e.g. `localhost:4200/table?sort=asc` and are typically used for optional 
information such as sorting, filtering, or pagination.

#### How Routing Query Parameters Work
1. Query parameters are added to the URL after the route path.
2. They can be added, modified, or removed without changing the route.
3. Components can read these parameters to adjust their behavior or display.

#### Key Differences from Route Parameters

- URL Structure:
   - Route params: /details/123
   - Query params: /details?id=123&sort=name&order=asc

- Query params are ideal for optional, changeable data that doesn't define the route.
- You can easily pass multiple key-value pairs in query params.


| Status | Description                                                                                                                  |
|--------|------------------------------------------------------------------------------------------------------------------------------|
| ❌     | Can only handle string data, complex data types need parsing or conversion.                                                   |
| ❌     | Sensitive data is exposed in the URL, making it vulnerable to tampering.                                                      |
| ❌     | Handling large or nested data with query params can become messy.                                                             |
| ❌     | Browser URL length limits restrict passing large data sets via query params.                                                  |
| ❌     | Not suitable for real-time communication, only for passing state during navigation.                                           |
| ✅     | Easy to share application state across users or sessions.                                                                     |
| ✅     | Query params persist in the URL, allowing bookmarking and sharing links with current state.                                   |
| ✅     | Can pass multiple key-value pairs in a single URL, making it flexible for data sharing.                                        |
| ✅     | Supports passing data without needing a direct parent-child component relationship, offering more flexible communication.      |

```typescript
// parent component
@Component({
  selector: 'app-parent',
  template: `
    <button (click)="goToDetails()">Go to Details</button>
  `,
})
class ParentComponent {
  router = inject(Router);

  goToDetails() {
    this.router.navigate(['/detail-query'], {
      queryParams: {
        id: '123',
        name: 'John Doe',
        role: 'Developer'
      }
    });
  }
}

// child component
@Component({
  selector: 'app-child',
  template: `
    <p>ID: {{ id }}</p>
    <p>Name: {{ name }}</p>
    <p>Role: {{ role }}</p>
  `,
})
class ChildComponent implements OnInit {
  id = '';
  name = '';
  role = '';

  route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.id = params['id'];
      this.name = params['name'];
      this.role = params['role'];
    });
  }
}
```

Full set of examples you can find in the [src/app/9-routing-query](src/app/9-routing-query) folder.


### Routing Input with `withComponentInputBinding()` 

Next and last topic is related to routing and input binding that enables 
params from url to be retrived via input in component. 
So, in simple words it's combination of routing params and input binding that you've
read already in this article. It's a modern approach that is available in Angular v17+.

| Status | Description                                                                             |
|--------|-----------------------------------------------------------------------------------------|
| ❌     | Overusing withComponentInputBinding() for communication can clutter the routing configuration by making it more complex and difficult to manage. Each time data needs to be passed between components, the route definition must include the necessary input bindings. As the application grows, this can lead to a routing configuration filled with many input bindings for different components, making the routing file harder to read and maintain.                               |
| ❌     | ??? Only works with routes, limiting its use for other types of component interactions. |
| ❌     | Not ideal for handling complex logic or real-time data updates.                         |
| ❌     | Supports one-way data binding only, requiring extra steps for two-way communication.    |
| ✅     | Cleaner, centralized logic in route config for easier maintenance.                      |
| ✅     | Enables decoupled communication between components through routes.                      |
| ✅     | Directly binds route data to component inputs, reducing extra code.                     |