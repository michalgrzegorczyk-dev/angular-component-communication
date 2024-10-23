# Mastering Component Communication in Angular

## Intro

During working on this article, I've noticed that there are many ways to
"communicate" in Angular, but not all of them are considered as component communication
by some developers - for me, it's the same level of discussion like choosing
tabs over spaces for indentation and vice versa. I would suggest focus on 
the main topic and learn as much as possible about it 😉. Also, I would
like to mention that this article intended for Angular developers who,
has some experience with the framework and wants to learn more about 
component communication.

When building applications with Angular, it's important to know how 
different parts of your application can share information. This is called 
component communication, and today I'll cover all possible 
ways to make components talk to each other and also points
out the ones that are less considered as component
communication itself, but can actually help to share information.

It's worth to remember that some of these approaches are better than
others in specific cases, but for sure it's always good to know all the
possibilities. This way, you can pick the best solution for your case in you application.
<u>The key is the critical thinking and understanding context of the problem.</u>

Every approach will be explained in detail, with
[code examples](https://github.com/michalgrzegorczyk-dev/angular-component-communication)
that you can run and test by yourself. FYI, code examples in the blog post will be simplified,
ass possible, so I really recommend you to check the full examples in the repository.


### Here's the list of topics that will be covered

- Most common approaches
  - `@Input` and `@Output` decorators
  - Setter methods with `@Input` decorator
  - `OnChanges` lifecycle hook combined with `@Input` decorators
  - `@Injectable` services
  - `@ViewChild` and `@ViewChildren` decorators
  - Routing Params and Queries, e.g. `/:id` and `?query=param`
  - Template reference variables `#`
  - Injecting parent components into child components
  - `@Input` and `@Output` inheritance
  - Using `@ContentChild` and `@ContentChildren` with `<ng-content>`
- Modern approaches, Angular v17+
  - `input()` and `output()`
  - `viewChild()` and `viewChildren()`
  - `<ng-content>` with `contentChild()` and `contentChildren()`
  - Routing with `@Input()` and usage of `withComponentInputBinding()`


## Inputs & Outputs, Setters and `ngOnChanges` lifecycle hook

<img src="/public/img/input.png" alt="x" style="width: 500px; height:auto;">

### Inputs & Outputs

The most fundamental way of enabling communication between components
in Angular is through the use of <b>input</b> and <b>output</b> functionality.
It can be achieved in many ways, old and new, most common and less known, 
directly and indirectly. All scenarios will be covered but for now let's start 
with the basics.

#### Traditional & Non-traditional Approach 

The traditional approach involves `@Input()` and `@Output()` 
decorators that allows a child components to receive passed data and enables
child components to send data back to its parents. This approach has been 
a used in Angular development for years and is the most basic way to 
communicate between components.

```typescript
// Component with input and output.
@Component({
  selector: 'app-component'
})
class Component {
  @Input()
  thisIsInputProperty = '';
  
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
| ❌ | Providing inputs and outputs via metadata properties can be harder to understand and can be inconcise.                                                                          ||
| ✅ | It's the common way to communicate between components, always good to use, and recommended.                                                                                     |
| ✅ | In the newest version of Angular, you can transform data as well as in setters (that we will elaborate in the moment) with the usage of @Input decorators metadata `transform`. | |

Let's take a look on non-traditional approach as well. It works the same way as with decorators but 
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
now we're working with signal approach.


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


| Status | Description                                         |
|--------|-----------------------------------------------------|
| ❌ | Need to create aditional property to set the value. |
| ❌ | More code, than inline `@Input`.                    |
| ✅ | Can perform advanced validation.                    |
| ✅ | Can transform the incoming data.                    |
| ✅ | Can trigger side effects.                           |

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
While this approach is not commonly used it's always good to know you can 
achieve that this way. Also, it's important to note that this inheritance method is 
compatible only with traditional input/output approach (without signals).

| Status | Description                                                                       |
|--------|-----------------------------------------------------------------------------------|
| ❌ | Component inheritance is rarely used in Angular, so probably you'll never use it. |
| ❌ | This approach is not compatible with the signals inputs and outputs.              |
| ✅ | Good to know more component communicatinon techniques than less.                  |

```typescript
// Parent component.
@Component({
  selector: 'app-parent',
})
export class ChildComponent extends ParentComponent {
  @Input()
  parentInput = 'hello';
}

// Child component.
@Component({
  selector: 'app-child',
  inputs: ['parentInput']
})
export class ChildComponent extends ParentComponent {
  // The child now has access to 'parentInput'.
  constructor() {
    super();
    console.log(this.parentInput);
  }
}
```

Full set of examples around this topic you can find in the [1-input-output](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/1-input-output) folder.


### `ngOnChanges` lifecycle Hook

Angular offers another way to handle input changes, the `ngOnChanges` 
lifecycle hook method. This method runs when a component's input 
properties change and provide some additional functionality due to SimpleChanges
parameter that is passed to it. Based on this parameter, you can check if
the input has changed, if it's the first change, and compare the new and old values.

| Status | Description                                                                 |
|--------|-----------------------------------------------------------------------------|
| ❌ | Runs for every input change, which may impact performance if overused.      |
| ❌ | Triggers for any input change, even if you only care about specific inputs. |
| ❌ | Need to set an additional property to set.                                  |
| ✅ | It can handle multiple inputs at once.                                      |
| ✅ | It lets you check if it's the first change.                                 | |
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

Services in Angular provide a probably most powerful way to share data across 
components, therefore while services can be a complex topic, we'll focus on the 
most common and straightforward approach, which is providing a service at 
the `root` level and focus on how we can communicate between components in easy way.

The most common way to use services in Angular is by usage of `BehaviorSubject` 
and `Observable`, or with the newer version of Angular, signals. A service can store a
value, and any component that needs to use or update that value can read to it.
Components can also send new values to the service, so it can be full two-way ecosystem.

In newer versions of Angular, signals make this process easier. Signals are a 
simpler way to work with observables, making it easier to subscribe to and update 
values in a more straightforward way, but here we're elaborating about 
component communication, so we will skip the details about different techniques that
can be implemented in services.

| Status | Description                                                               |
|--------|---------------------------------------------------------------------------|
| ❌ | Requires understanding of dependency injection, observables, and signals. |
| ❌ | Can introduce additional complexity for simple applications.              |
| ✅ | Allow components to communicate without direct dependencies.              |
| ✅ | Can be used across multiple components.                                   |


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

Template variables are another feature in Angular that lets parent and child 
components communicate directly through the template by using special sign `#`. 
This allows to reference elements or components within the template,
making it easier to create dynamic and interactive interactions between components.

| Status | Description                                                                            |
|--------|----------------------------------------------------------------------------------------|
| ❌ | Not scalable, creates tightly coupled components.                                      |
| ❌ | `#` is only accessible within the template.                                            |
| ❌ | Only allow communication one-way, from parent to child.                                |
| ❌ | Be careful with accesing it in the component because, e.g. it can be not rendered yet. |
| ✅ | Simple and direct access.                                                              |
| ✅ | No need for extra code for inputs, outputs or services to communicate between.         |
| ✅ | Parent can call child methods, set and get properties.                                 |

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

Injecting components is very rarely used technique and personally, I haven't
seen that, but it's great discover to elaborate 😁. It allows a child component to 
access its parent component directly. This method provides a way to 
establish communication between components in a parent-child 
relationship. What you need to do is to inject one of the parent component
into the child component constructor.

| Status | Description                                                                                                                                                                |
|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ❌ | Not widely used in real-world applications, therefore can be misleasing.                                                                                                   ||
| ❌ | Makes components tightly coupled.                                                                                                                                          |
| ❌ | Only allow communication one-way, from parent to child.                                                                                                                    |
| ❌ | Can only inject components that are part of the direct parent hierarchy.                                                                                                   |
| ✅ | For very specific cases, this technique can simplify communication between tightly related components by eliminating the need for intermediate services or event emitters. |
| ✅ | Allow a child component to call methods or access properties directly from the parent component.                                                                           |


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
Yet, another big tool in Angular. This one allows a parent component 
to access and interact with its child components directly. This technique 
provides a way to establish communication between components in a 
parent-child relationship through the template. By default, `ViewChild` feature in 
Angular selects the first matching element or component in the view.

#### Traditional approach 
The traditional method uses `@ViewChild()` to access a child component directly 
from the parent. What you need to do it access child component by its class
and adjust `@ViewChild()` decorator to the child component class.

| Status | Description                                                                                    |
|--------|------------------------------------------------------------------------------------------------|
| ❌ | Strong dependency between parent and child, reducing reusability and flexibility.              |
| ❌ | Only works for direct parent-child relationships, not across siblings or unrelated components.        |
| ❌ | Overusing `@ViewChild()` in large apps can make the structure harder to maintain.              |
| ✅ | Allows the parent to directly access and control the child component's methods and properties. |
| ✅ | The parent can access the latest state of the child component whenever needed.                 | 


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
In Angular v17+, there is a new way to use `ViewChild` feature, with signals `viewChild()`.
In this case we need to specify the string that indicates the template reference variable
of the child component, or it's locator that is the same as we did with `@ViewChild`.
This way we can access the child component directly from the parent.

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


## ContentChild and ContentChildren

<img src="/public/img/projection.png" alt="x" style="width: 500px; height: auto;">

### Component Projection with Content Child & Content Children
While `ViewChild` and `ViewChildren`, works with elements, in a component's template,
 `ContentChild` and `ContentChildren` works with projected content (content between 
component tags). This feature allows a component to query and manipulate content 
that is projected into it from a parent component.

#### Traditional approach
The traditional method uses `@ContentChild()` and `@ContentChildren()` decorators to 
access projected content. These decorators work together with `<ng-content>` tag to 
enable flexible content projection patterns.

| Status | Description                                                                               |
|--------|-------------------------------------------------------------------------------------------|
| ❌ | Only accessible after ngAfterContentInit lifecycle hook.                                  |
| ❌ | Cannot access projected content during component initialization.                          |
| ❌ | Multiple ng-content slots can make the template structure complex and hard to understand. |
| ✅ | Enables flexible component composition through content projection.                        |
| ✅ | Allows dynamic interaction with projected content.                                        |

```typescript
// parent component
@Component({
  selector: 'app-parent',
  template: `
    <div class="parent">
      <ng-content select="[header]" />
      <ng-content />
    </div>
  `
})
class ContainerComponent implements AfterContentInit {
  @ContentChild('header') 
  headerContent: ElementRef;

  @ContentChildren(ItemComponent) 
  items: QueryList<ItemComponent>;

  ngAfterContentInit() {
    // Access projected content here.
    this.items.forEach(item => console.log(item.title));
  }
}

// Usage in parent.
@Component({
  template: `
    <app-container>
      <app-item title="Item 1" />
      <app-item title="Item 2" />
    </app-container>
  `
})
```

#### Modern Approach with Signals
In Angular 17+, there is also equivalent `contentChild()` and `contentChildren()` functions, 
that works the same but again, as signals.

Full set of examples around this topic you can find in the [src/app/8-component-projection](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/8-component-projection) folder.


## Routing Params & Queries

<img src="/public/img/router.png" alt="x" style="width: 500px; height: auto;">

### Routing Parameters

Routing parameters provide a strong way to pass data between components in 
Angular applications. This method is particularly useful when you need to 
share information across components that are not directly related in the component tree.

To achieve proper flow you need to define routes in the route configuration pass them 
to `provideRouter(routes)` function or in `RouterModule` (old approach). When navigating 
to a route, you're able to pass values for these parameters. The component associated with 
the route can then access these parameters.

| Status | Description                                                                                                                    |
|--------|--------------------------------------------------------------------------------------------------------------------------------|
| ❌ | Params are always strings, so you may need to parse or convert complex data types.                                             ||
| ❌ | Sensitive data passed through the URL can be visible and prone to tampering.                                                   ||
| ✅ | Allows passing data between components without direct parent-child relationships, enabling more flexible component interaction. |
| ✅ | Data in URL params is preserved during navigation and can be shared easily through links.                                      | |
| ✅ | Components can easily access params via `ActivatedRoute` service.                                                       | |


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
  template: `
    <button (click)="goToDetails()">Go to detail</button>
    <router-outlet/>
  `,
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

Full set of examples around this topic you can find in the [src/app/9-routing-params](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/src/app/9-routing-params) folder.




### Routing Queries 

Routing queries provide a flexible way to pass optional data between
components in Angular applications. Unlike route parameters, which are part of
the route path, query parameters are appended to the URL after a question
mark `?`, e.g. `localhost:4200/table?sort=asc` and are typically used for optional 
information such as sorting, filtering, or pagination.

Query parameters need to be added to the URL after the route path. They can be
added, modified, or removed without changing the route. Components can read
these parameters to adjust their behavior or display.

#### Key differences from Route Parameters

- URL structure:
   - Route params: `/details/123`
   - Query params: `/details?id=123&sort=name&order=asc`


| Status | Description                                                                           |
|--------|---------------------------------------------------------------------------------------|
| ❌     | Can only handle string data, complex data types need parsing or conversion.           |
| ❌     | Sensitive data is exposed in the URL, making it vulnerable to tampering.              |
| ❌     | Handling large or nested data with query params can become messy.                     |
| ❌     | Browser URL length limits restrict passing large data sets via query params.          |
| ❌     | Not suitable for real-time communication, only for passing state during navigation.   |
| ✅     | Easy to share application state across users or sessions.                             |
| ✅     | Persist in the URL, allowing bookmarking and sharing links with current state.        |
| ✅     | Ideal for optional, changeable data that doesn't define the route.                    |
| ✅     | Can pass multiple key-value pairs in a single URL, making it flexible for data sharing. |
| ✅     | Can easily pass multiple key-value pairs in query params.                             |

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

Full set of examples around this topic you can find in the [src/app/9-routing-queries](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/9-routing-queries) folder.


### Routing Input with `withComponentInputBinding()` 

The final topic covers the combination of routing and input binding, which allows you to 
retrieve URL parameters directly through component inputs. This modern feature 
connects routing parameters with input binding, simplifying how components receive URL 
data. This approach was introduced in Angular version 17 and later.

To achieve such a connection, you need to use the `withComponentInputBinding()` function
from the Angular router. This function allows you to define a route configuration with
input bindings for components. When navigating to a route, the router will automatically
bind the URL parameters to the component inputs.

| Status | Description                                                   |
|---------|---------------------------------------------------------------|
| ❌      | Can make routing config complex when overused                   |
| ❌      | Limited for complex/real-time data handling                     |
| ❌      | One-way data binding only                                      |
| ✅      | Clean, centralized route config                                |
| ✅      | Components communicate via routes                              |
| ✅      | Direct route-to-input binding with less code                   |

```typescript
// parent component
@Component({
  selector: 'app--parent',
  template: `
    <button (click)="changeRoute('155')">Go to id: 155</button>
    <router-outlet/>
  `,
  imports: [
    ChildComponent,
    RouterOutlet
  ],
})
class RoutingInputParentComponent {
  router = inject(Router);

  changeRoute(id: string) {
    this.#router.navigate(['/router-input', id]);
  }
}

// child component
@Component({
  template: `
    ID: {{ id }}
  `,
})
class RoutingInputChildComponent {
  // this value is going to change to 155 after click on the button in parent
  @Input() id = 'default'; 
}
```

Full set of examples around this topic you can find in the [src/app/11-routing-input](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/11-routing-input) folder.

## Outro
That's it, you finally reached to the end of the blog post. We've covered all the 
ways of component communication in Angular, showed cases for old syntax and
most recent with usage of signals. I showed component communication in different variants,
direct, indirect, commonly used and less known techniques. I really hope you enjoyed 
reading it. If you have any questions, feel free to ask in the comments below. 

All the examples are available in the [GitHub repository](https://github.com/michalgrzegorczyk-dev/angular-component-communication).

Thanks for reading! 🙏