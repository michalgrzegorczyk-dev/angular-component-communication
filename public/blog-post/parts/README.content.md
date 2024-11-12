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
| ⚠️  | Improper use can cause side effects that you may not want.                |
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


### Understanding `ngOnChanges` Lifecycle Hook

Let's explore `ngOnChanges`, a helpful lifecycle hook in Angular that tracks changes to 
your component's input values. When inputs change, Angular automatically runs 
this method, providing you with `SimpleChanges` that tell you three key things:
what changed, if it's the first change, and both the old and new values.

| Status | Description                                                                         |
|--------|-------------------------------------------------------------------------------------|
| ❌ | Executes on every input change, which may affect performance if not used carefully. |
| ❌ | Runs for all input changes, even when you're interested in specific ones only.      |
| ❌ | Requires setting up additional properties to track changes.                         |
| ⚠️ | Runs first before `OnInit` Lifecycle Hook                                           |
| ⚠️ | Improper use can cause side effects that you may not want.                                                         |
| ✅ | Efficiently handles multiple input changes in a single lifecycle hook.              |
| ✅ | Provides easy detection of first-time changes to input properties.                  | |
| ✅ | Enables comparison between previous and current input values.                       | |

```typescript 
// Component that tracks input changes.
@Component()
class Component implements OnChanges {
  input = input('initial');
  value = signal('');

  ngOnChanges(changes: SimpleChanges) {
    if (changes['input'].isFirstChange()) {
      // Handle first change of input.
      console.log(changes['input'].currentValue);
    } else {
      // Compare previous and current values.
      console.log(changes['input'].previousValue);
      console.log(changes['input'].currentValue);
      this.value.set(changes['input'].currentValue);
    }
  }
}
```

Full set of examples around this topic you can find in the [2-input-ng-on-changes](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/2-input-ng-on-changes) folder.


## Services in Angular

<img src="/public/img/services.png" alt="x" style="width: 500px; height: auto;">

Services are a fundamental feature in Angular that serve multiple purposes, with one 
of their most powerful uses being data sharing between components. When provided at
the `root` level, services create a centralized way for components to communicate and
exchange information effectively.

Think of a service as a central hub where components can store and access shared data. 
Any component can read from or write to this hub, creating a smooth two-way flow of information.

| Status | Description                                                                  |
|--------|------------------------------------------------------------------------------|
| ❌ | Requires understanding of Angular's dependency injection system.             |
| ⚠️ | Simple class that can be injected, usually used with Signals or Observables. |
| ✅ | Enables component communication without creating direct dependencies.        |
| ✅ | Works across multiple components throughout your application.                |
| ✅ | Provides a centralized place for sharing data and logic.                     |
| ✅ | Makes testing easier by separating concerns.                                 |


```typescript
// Service that manages shared data.
@Injectable({
  providedIn: 'root'
})
class NewService {
  value = signal('initial');

  setValue(value: string) {
    this.value.set(value);
  }
}

// Component using the shared service.
class ServiceComponent {
  service = inject(NewService);
  valueFromService = this.service.value;
  
  setValue(value: string) {
    this.service.setValue(value);
  }
}
```

Full set of examples around this topic you can find in the [3-service](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/3-service) folder.


## Template Variables in Angular

<img src="/public/img/template.png" alt="x" style="width: 500px; height: auto;">

Template variables are a really cool feature in Angular marked by the `#` symbol.
Think of them as quick references you can create in your template 
to connect parent and child components. It's like giving your components nicknames 
they can use to talk to each other!

| Status | Description                                                                                                                        |
|-------|------------------------------------------------------------------------------------------------------------------------------------|
| ❌     | Limited scalability due to tight coupling between components.                                                                      |
| ❌     | Variables are only accessible within the template unless passed through events.                                                                                                                                   |
| ❌     | Timing issues can occur if accessing elements before they're rendered.                                           |
|  ✅      | Enables bi-directional communication between parent and child components within templates. |
| ✅     | Works smoothly with `ViewChild` and template functions for element access.                                |
| ✅     | Provides quick, direct access to component references.                                                                                                        |
| ✅     | Reduces boilerplate code by eliminating need for inputs, outputs, or services.                                                    |
| ✅     | Gives parent components full access to child methods and properties.                                                                            |

```typescript
// Child component with todo management.
@Component()
class TodoListComponent {
  todos = ['Learn Angular', 'Build an app'];

  addTodo() {
    this.todos.push(`New Todo ${this.todos.length + 1}`);
  }
}

// Parent component using template variable.
@Component({
  template: `
    <todo-list #todoList/>
    <button (click)="addTodo(todoList)">Add Todo</button>
  `,
  imports: [TodoListComponent]
})
class ParentComponent {
  addTodo(todoList: TodoListComponent) {
    // Access child component through template variable.
    todoList.addTodo();
  }
}
```

Full set of examples around this topic you can find in the [4-template-variable](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/4-template-variable) folder.


## Injected Components in Angular

<img src="/public/img/injected-components.png" alt="x" style="width: 500px; height: auto;">

Let's explore an interesting but rarely-used technique of component injection! 
This approach lets a child component directly access its parent by injecting the 
parent component into the child's constructor. While not common, it's worth understanding 
for specific use cases.

| Status | Description                                                                                                                                                                |
|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ❌ | Rare in real-world applications, which may make the code less maintainable for teams.                                                                                                 |
| ❌ | Creates strong dependencies between components, reducing reusability.                                                                                                                                        |
| ❌ | Limited to one-way communication from child to parent.                                                                                                  |
| ❌ | Only works with direct parent components in the hierarchy.                                                                                                 |
| ✅ | Simplifies parent-child communication in specific cases without extra services. |
| ✅ | Provides direct access to parent methods and properties from the child component.                                                                           |


```typescript
// Parent component that child can access.
@Component()
class ParentComponent {
  foo() {
    alert('bar');
  }
}

// Child component with injected parent.
class ChildComponent {
  constructor(private parentComponent: ParentComponent) {
    this.parentComponent.foo(); // Direct access to parent's methods.
  }
}
```

Full set of examples around this topic you can find in the [5-injected-component](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/5-injected-component) folder.


## ViewChild and ViewChildren
<img src="/public/img/view-child.png" alt="x" style="width: 500px; height: auto;">

### Understanding ViewChild in Angular
`ViewChild` is a versatile Angular tool that lets parent components interact directly 
with their child components. By default, it selects the first matching element or 
component in the view, making it perfect for one-to-one parent-child communication 
through the template.

#### Traditional approach 
The classic method uses the `@ViewChild()` decorator to connect a parent with its child component. 
You'll reference the child component's class in the decorator to establish this connection.

| Status | Description                                                                                    |
|--------|------------------------------------------------------------------------------------------------|
| ❌ | Creates tight coupling between parent and child components, which can limit reusability.            |
| ❌ | Limited to direct parent-child relationships only.                                            |
| ❌ | Extensive use of `ViewChild` can make applications harder to maintain and test.             |
| ✅ | Provides direct access to child component's public methods and properties. |
| ✅ | Enables real-time access to child component's state and behavior.                 | 


```typescript
// Child component with a method parent can call.
@Component({
  selector: 'app-child',
})
class ChildComponent {
  foo() {
    console.log('bar');
  }
}

// Parent component that controls the child.
@Component({
  selector: 'app-parent',
  template: `
    <app-child/>
    <button (click)="click()">Call Child Method</button>
  `,
  imports: [ChildComponent]
})
class ParentComponent {
  @ViewChild(ChildComponent)
  child!: ChildComponent;

  click() {
    // Calls the child component's foo method.
    this.childComponent.foo();
  }
}
```

#### Modern Signal-Based Approach
Angular 17+ introduces a cleaner way to use `ViewChild` with the `viewChild()` signal function. 
You can specify either a template reference variable or a component class to locate 
the child component.

```typescript
// Parent component using signal-based ViewChild.
@Component({
  template: `
    <app-child/>
    <button (click)="click()">Call Child Method</button>
  `,
  imports: [ChildComponent]
})
class ViewChildParentNewComponent {
  child = viewChild<ChildComponent>(ChildComponent);

  click() {
    // Calls the child component's foo method using signal syntax.
    this.child().foo(); 
  }
}
```

Full set of examples around this topic you can find in the [6-view-child](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/6-view-child) folder.


### Understanding ViewChildren in Angular
Building on our knowledge of `ViewChild` comes its sibling feature, `ViewChildren`.
This robust tool lets a parent component work with multiple 
child components or elements in its template. While ViewChild gives you one 
element, `ViewChildren` provides a `QueryList` containing all matching elements.

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


## ContentChild and ContentChildren in Angular

<img src="/public/img/projection.png" alt="x" style="width: 500px; height: auto;">

Here's how to work with projected content in Angular components! 
While `ViewChild` and `ViewChildren` handle elements in a component's template,
`ContentChild` and `ContentChildren` deal with content that's projected between
component tags. This advanced feature helps you manage content passed
from parent components.

#### Practical Uses of Content Projection
1. Card component might have a predefined style and layout
   (like header, body, and footer areas), but the actual content of these areas
   can be projected by the parent component, allowing for versatile reuse across
   different parts of an application.
2. Tab set component where each tab’s content is projected from a
   parent component, allowing each tab content to be uniquely defined while using the
   same tab navigation system.

| Status | Description                                                                                                                                                               |
|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ❌ | Content is only available after the `ngAfterContentInit` lifecycle hook, not during initialization.                                                                       |
| ❌ | Component initialization cannot access or manipulate projected content.                                                                                                   |
| ❌ | Lacks strong typing, making it harder to ensure type safety for projected content.                                                                                            |
| ⚠️ | Using multiple ng-content slots adds complexity, but enables powerful component compositions when used carefully. |
| ✅ | Creates flexible and reusable components through content projection features.                                                                                                      |
| ✅ | Provides direct access to projected content, making it easy to interact with nested elements.                                                                                                                       |


### Traditional Approach Explained
The classic way uses `@ContentChild()` and `@ContentChildren()` decorators along 
with the `<ng-content>` tag. This combination gives you flexible ways to 
project and manage content.

```typescript
// Parent component with content projection slots.
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
    // Access projected content after initialization.
    this.items.forEach(item => console.log(item.title));
  }
}

// Example usage in a parent component.
@Component({
  template: `
    <app-container>
      <app-item title="Item 1" />
      <app-item title="Item 2" />
    </app-container>
  `
})
```

### Modern Signal-Based Approach
Angular 17+ introduces signal-based versions with `contentChild()` and `contentChildren()`
functions. They work similarly, but give you the power of signals.

Full set of examples around this topic you can find in the [src/app/8-component-projection](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/8-component-projection) folder.


## Routing Parameters & Queries in Angular

<img src="/public/img/router.png" alt="x" style="width: 500px; height: auto;">

### Routing Parameters

This section explores how to pass data between Angular components using route parameters.
This is especially helpful when you need to share information between components that aren't 
directly connected in your component tree.

To get started, you'll need to set up your routes in the configuration and pass them to the 
`provideRouter(routes)` function (or `RouterModule` if you're using the older approach). 
Once set up, you can pass values through these routes when navigating. Your components 
can then easily access these parameters.

#### Practical Uses of Routing Params
1. Most common use cae is navigation to detailed view of specific item.
2. Steps in multistep process or workflow, can help to keep track of the current step like `/checkout/step-2`.
3. Filtering Subsections of data like `products/category/electronics`.


| Status | Description                                                                                                                    |
|--------|--------------------------------------------------------------------------------------------------------------------------------|
| ❌ | Params are always strings, so you may need to parse or convert complex data types.                                           |
| ❌ | Sensitive data passed through the URL can be visible and prone to tampering.                                                   |
| ✅ | Allows passing data between components without direct parent-child relationships, enabling more flexible component interaction. |
| ✅ | Data in URL params is preserved during navigation and can be shared easily through links.                                      |
| ✅ | Components can easily access params via `ActivatedRoute` service.                                                     |


```typescript
// Sets up the routing configuration.
const routes = [
  { path: 'details/:id', component: ChildComponent },
];

const appConfig = {
  providers: [provideRouter(routes)]
};

// Parent component - handles navigation to details.
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

// Child component - displays the route parameter value.
@Component({
  selector: 'app-child',
  template: `{{ id() }}`,
})
class ChildComponent implements OnInit {
  id = signal('foo');
  activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id.set(params['id']); // Will display '123'.
    });
  }
}
```

Full set of examples around this topic you can find in the [src/app/9-routing-params](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/src/app/9-routing-params) folder.




### Routing Queries in Angular

Routing queries offer a perfect solution for handling optional parameters!
Unlike regular route parameters that are part of the URL path, query parameters 
come after a question mark (`?`) in your URL. For example: `localhost:4200/table?sort=asc`.
They're great for handling things like sorting, filtering, or page numbers.

You can add, change, or remove query parameters without changing your main route path.
Your components can then read these parameters to adjust what they show or how they behave.

#### How Are Query Parameters Different from Route Parameters?

- URL Structure:
   - Route parameters look like this:  `/details/123`
   - Query parameters look like this: `/details?id=123&sort=name&order=asc`


#### Practical Uses of Routing Queries
1. Filtering and Sorting e.g. list view data are common uses for query parameters.
2. Pagination - query parameters can be used to store the current page number.
3. Search terms - useful for any application that has a search feature, enhancing
user experience by allowing direct navigation to pre-searched results.
4. Pre-populating forms through link, query parameters can carry the necessary data
to populate form fields.

| Status | Description                                                                           |
|--------|---------------------------------------------------------------------------------------|
| ❌     | Can only handle string data, complex data types need parsing or conversion.           |
| ❌     | Sensitive data is exposed in the URL, making it vulnerable to tampering.            |
| ❌     | Handling large or nested data with query params can become messy.                     |
| ❌     | Browser URL length limits restrict passing large data sets via query params.          |
| ❌     | Not suitable for real-time communication, only for passing state during navigation.   |
| ✅     | Easy to share application state across users or sessions.                        |
| ✅     | Persist in the URL, allowing bookmarking and sharing links with current state.        |
| ✅     | Ideal for optional, changeable data that doesn't define the route.                    |
| ✅     | Can pass multiple key-value pairs in a single URL, making it flexible for data sharing. |

```typescript
// Parent component - handles navigation to details page.
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

// Child component - displays the query parameter values.
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


### Using `withComponentInputBinding()` for Easier Routing 

Angular 16+ introduced a game-changing feature that does exactly that! Let's explore how 
`withComponentInputBinding()` makes routing and data handling much smoother.

This new approach creates a direct connection between your URL parameters and component inputs. 
It's like having an automatic pipeline that connects your URLs to your components, saving you 
from writing extra code!

To use this feature, you'll need the `withComponentInputBinding()` function from the Angular router. 
Once set up, the router will automatically connect your URL parameters to your component inputs when 
someone visits a page.


| Status | Description                                     |
|---------|-------------------------------------------------|
| ❌      | Can make routing more complex if used too much. |
| ❌      | Not great for complex data that changes often.  |
| ❌      | Data only flows one way.                        |
| ❌      | Types aren't checked automatically.             |
| ✅      | Clean, organized route setup.                   |
| ✅      | Components can talk through routes.             |
| ✅      | Less code needed.                               |

```typescript
// Parent component - handles navigation.
@Component({
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

// Child component - receives the ID.
@Component({
  template: `
    ID: {{ id }}
  `,
})
class RoutingInputChildComponent {
  // Changes to '155' when you click the button in the parent.
  @Input() id = 'default'; 
}
```

Full set of examples around this topic you can find in the [src/app/11-routing-input](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/11-routing-input) folder.


### Routing State Object 

When you perform navigation actions in Angular, you can also pass along a state 
object in the navigation extras. This object is transient, meaning it is only available
during the lifetime of the navigation and does not persist if the page is reloaded.

You can pass the state object using the `navigate()` method of the `Router` service, or through a 
`[routerLink]` directive with binding. Here's an example with `navigate()`:

Once you navigate to the destination component, you can access the state from the Router service. 
This is typically done in the ngOnInit lifecycle hook or directly in the constructor, depending on 
when you need to access the data.

#### Practical Uses of State Objects
1. Pre-populating - if you navigate to a form component, and you want pre-populate it with data from
    the previous component, you can pass this data through the state object.
2. Confirming actions - if a user performs an action, and you need to pass results 
  or confirmation messages to the next component, you can use the state object.
3. Avoid secure data in URL - if you have sensitive data that you don't want to expose in the URL, 
  you can pass it through the state object.


| Status | Description                                                                                                             |
|---------|-------------------------------------------------------------------------------------------------------------------------|
| ❌      | Does not work properly with SSR, because it lose the state.                                                             | |
| ❌      | Impossible to share a link to a specific application state with another user.                                           | |
| ❌      | State object is not inherently type-safe by default.                                                                    | |
| ⚠️      | Data passed in the state object is not retained after a refresh or if the navigation history is modified.               |
| ✅      | Ability to pass complex data objects between components during navigation.                                              |
| ✅      | Ability to pass complex data objects between components during navigation.                                              |
| ✅      | The router state object allows you to pass sensitive or personal data between components without exposing it in the URL |

```typescript
// Parent component - navigate to next component.
@Component({
  template: `
    <button (click)="changeRoute()">click</button>
  `,
})
class RoutingObjectStateParentComponent {
  router = inject(Router);
  
  changeRoute() {
    this.router.navigate(['router-object'], { state: { user: { name: 'Secret', value: 30 }}});
  }
}

// Child component - receives the state object.
@Component({
  template: ``,
})
class RoutingObjectStateChildComponent {
  router = inject(Router);

  constructor() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationStart),
      map(() => this.router.getCurrentNavigation()?.extras.state),
    ).subscribe(state => {
      if (state) {
        console.log('Received state:', state);
      }
    });
  }
}
```

Full set of examples around this topic you can find in the [src/app/12-routing-object](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/12-routing-object) folder.

## Inputs & Outputs, Setters and `ngOnChanges` Lifecycle Hook

<img src="/public/img/img.jpeg" alt="Inputs and Outputs" style="width: 500px; height:auto;">

[//]: # (<img src="/public/img/input.png" alt="Inputs and Outputs" style="width: 500px; height:auto;">)

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
| ⚠️  | Improper use can cause side effects that you may not want.                |
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


### Understanding `ngOnChanges` Lifecycle Hook

Let's explore `ngOnChanges`, a helpful lifecycle hook in Angular that tracks changes to 
your component's input values. When inputs change, Angular automatically runs 
this method, providing you with `SimpleChanges` that tell you three key things:
what changed, if it's the first change, and both the old and new values.

| Status | Description                                                                         |
|--------|-------------------------------------------------------------------------------------|
| ❌ | Executes on every input change, which may affect performance if not used carefully. |
| ❌ | Runs for all input changes, even when you're interested in specific ones only.      |
| ❌ | Requires setting up additional properties to track changes.                         |
| ⚠️ | Runs first before `OnInit` Lifecycle Hook                                           |
| ⚠️ | Improper use can cause side effects that you may not want.                                                         |
| ✅ | Efficiently handles multiple input changes in a single lifecycle hook.              |
| ✅ | Provides easy detection of first-time changes to input properties.                  | |
| ✅ | Enables comparison between previous and current input values.                       | |

```typescript 
// Component that tracks input changes.
@Component()
class Component implements OnChanges {
  input = input('initial');
  value = signal('');

  ngOnChanges(changes: SimpleChanges) {
    if (changes['input'].isFirstChange()) {
      // Handle first change of input.
      console.log(changes['input'].currentValue);
    } else {
      // Compare previous and current values.
      console.log(changes['input'].previousValue);
      console.log(changes['input'].currentValue);
      this.value.set(changes['input'].currentValue);
    }
  }
}
```

Full set of examples around this topic you can find in the [2-input-ng-on-changes](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/2-input-ng-on-changes) folder.


## Services in Angular

[//]: # (<img src="/public/img/services.png" alt="x" style="width: 500px; height: auto;">)
<img src="/public/img/img.jpeg" alt="Inputs and Outputs" style="width: 500px; height:auto;">


Services are a fundamental feature in Angular that serve multiple purposes, with one 
of their most powerful uses being data sharing between components. When provided at
the `root` level, services create a centralized way for components to communicate and
exchange information effectively.

Think of a service as a central hub where components can store and access shared data. 
Any component can read from or write to this hub, creating a smooth two-way flow of information.

| Status | Description                                                                  |
|--------|------------------------------------------------------------------------------|
| ❌ | Requires understanding of Angular's dependency injection system.             |
| ⚠️ | Simple class that can be injected, usually used with Signals or Observables. |
| ✅ | Enables component communication without creating direct dependencies.        |
| ✅ | Works across multiple components throughout your application.                |
| ✅ | Provides a centralized place for sharing data and logic.                     |
| ✅ | Makes testing easier by separating concerns.                                 |


```typescript
// Service that manages shared data.
@Injectable({
  providedIn: 'root'
})
class NewService {
  value = signal('initial');

  setValue(value: string) {
    this.value.set(value);
  }
}

// Component using the shared service.
class ServiceComponent {
  service = inject(NewService);
  valueFromService = this.service.value;
  
  setValue(value: string) {
    this.service.setValue(value);
  }
}
```

Full set of examples around this topic you can find in the [3-service](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/3-service) folder.


## Template Variables in Angular

[//]: # (<img src="/public/img/template.png" alt="x" style="width: 500px; height: auto;">)

<img src="/public/img/img.jpeg" alt="Inputs and Outputs" style="width: 500px; height:auto;">


Template variables are a really cool feature in Angular marked by the `#` symbol.
Think of them as quick references you can create in your template 
to connect parent and child components. It's like giving your components nicknames 
they can use to talk to each other!

| Status | Description                                                                                                                        |
|-------|------------------------------------------------------------------------------------------------------------------------------------|
| ❌     | Limited scalability due to tight coupling between components.                                                                      |
| ❌     | Variables are only accessible within the template unless passed through events.                                                                                                                                   |
| ❌     | Timing issues can occur if accessing elements before they're rendered.                                           |
|  ✅      | Enables bi-directional communication between parent and child components within templates. |
| ✅     | Works smoothly with `ViewChild` and template functions for element access.                                |
| ✅     | Provides quick, direct access to component references.                                                                                                        |
| ✅     | Reduces boilerplate code by eliminating need for inputs, outputs, or services.                                                    |
| ✅     | Gives parent components full access to child methods and properties.                                                                            |

```typescript
// Child component with todo management.
@Component()
class TodoListComponent {
  todos = ['Learn Angular', 'Build an app'];

  addTodo() {
    this.todos.push(`New Todo ${this.todos.length + 1}`);
  }
}

// Parent component using template variable.
@Component({
  template: `
    <todo-list #todoList/>
    <button (click)="addTodo(todoList)">Add Todo</button>
  `,
  imports: [TodoListComponent]
})
class ParentComponent {
  addTodo(todoList: TodoListComponent) {
    // Access child component through template variable.
    todoList.addTodo();
  }
}
```

Full set of examples around this topic you can find in the [4-template-variable](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/4-template-variable) folder.


## Injected Components in Angular

[//]: # (<img src="/public/img/injected-components.png" alt="x" style="width: 500px; height: auto;">)

<img src="/public/img/img.jpeg" alt="Inputs and Outputs" style="width: 500px; height:auto;">


Let's explore an interesting but rarely-used technique of component injection! 
This approach lets a child component directly access its parent by injecting the 
parent component into the child's constructor. While not common, it's worth understanding 
for specific use cases.

| Status | Description                                                                                                                                                                |
|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ❌ | Rare in real-world applications, which may make the code less maintainable for teams.                                                                                                 |
| ❌ | Creates strong dependencies between components, reducing reusability.                                                                                                                                        |
| ❌ | Limited to one-way communication from child to parent.                                                                                                  |
| ❌ | Only works with direct parent components in the hierarchy.                                                                                                 |
| ✅ | Simplifies parent-child communication in specific cases without extra services. |
| ✅ | Provides direct access to parent methods and properties from the child component.                                                                           |


```typescript
// Parent component that child can access.
@Component()
class ParentComponent {
  foo() {
    alert('bar');
  }
}

// Child component with injected parent.
class ChildComponent {
  constructor(private parentComponent: ParentComponent) {
    this.parentComponent.foo(); // Direct access to parent's methods.
  }
}
```

Full set of examples around this topic you can find in the [5-injected-component](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/5-injected-component) folder.


## ViewChild and ViewChildren

[//]: # (<img src="/public/img/view-child.png" alt="x" style="width: 500px; height: auto;">)

<img src="/public/img/img.jpeg" alt="Inputs and Outputs" style="width: 500px; height:auto;">


### Understanding ViewChild in Angular
`ViewChild` is a versatile Angular tool that lets parent components interact directly 
with their child components. By default, it selects the first matching element or 
component in the view, making it perfect for one-to-one parent-child communication 
through the template.

#### Traditional approach 
The classic method uses the `@ViewChild()` decorator to connect a parent with its child component. 
You'll reference the child component's class in the decorator to establish this connection.

| Status | Description                                                                                    |
|--------|------------------------------------------------------------------------------------------------|
| ❌ | Creates tight coupling between parent and child components, which can limit reusability.            |
| ❌ | Limited to direct parent-child relationships only.                                            |
| ❌ | Extensive use of `ViewChild` can make applications harder to maintain and test.             |
| ✅ | Provides direct access to child component's public methods and properties. |
| ✅ | Enables real-time access to child component's state and behavior.                 | 


```typescript
// Child component with a method parent can call.
@Component({
  selector: 'app-child',
})
class ChildComponent {
  foo() {
    console.log('bar');
  }
}

// Parent component that controls the child.
@Component({
  selector: 'app-parent',
  template: `
    <app-child/>
    <button (click)="click()">Call Child Method</button>
  `,
  imports: [ChildComponent]
})
class ParentComponent {
  @ViewChild(ChildComponent)
  child!: ChildComponent;

  click() {
    // Calls the child component's foo method.
    this.childComponent.foo();
  }
}
```

#### Modern Signal-Based Approach
Angular 17+ introduces a cleaner way to use `ViewChild` with the `viewChild()` signal function. 
You can specify either a template reference variable or a component class to locate 
the child component.

```typescript
// Parent component using signal-based ViewChild.
@Component({
  template: `
    <app-child/>
    <button (click)="click()">Call Child Method</button>
  `,
  imports: [ChildComponent]
})
class ViewChildParentNewComponent {
  child = viewChild<ChildComponent>(ChildComponent);

  click() {
    // Calls the child component's foo method using signal syntax.
    this.child().foo(); 
  }
}
```

Full set of examples around this topic you can find in the [6-view-child](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/6-view-child) folder.


### Understanding ViewChildren in Angular
Building on our knowledge of `ViewChild` comes its sibling feature, `ViewChildren`.
This robust tool lets a parent component work with multiple 
child components or elements in its template. While ViewChild gives you one 
element, `ViewChildren` provides a `QueryList` containing all matching elements.

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


## ContentChild and ContentChildren in Angular

[//]: # (<img src="/public/img/projection.png" alt="x" style="width: 500px; height: auto;">)

<img src="/public/img/img.jpeg" alt="Inputs and Outputs" style="width: 500px; height:auto;">


Here's how to work with projected content in Angular components! 
While `ViewChild` and `ViewChildren` handle elements in a component's template,
`ContentChild` and `ContentChildren` deal with content that's projected between
component tags. This advanced feature helps you manage content passed
from parent components.

#### Practical Uses of Content Projection
1. Card component might have a predefined style and layout
   (like header, body, and footer areas), but the actual content of these areas
   can be projected by the parent component, allowing for versatile reuse across
   different parts of an application.
2. Tab set component where each tab’s content is projected from a
   parent component, allowing each tab content to be uniquely defined while using the
   same tab navigation system.

| Status | Description                                                                                                                                                               |
|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ❌ | Content is only available after the `ngAfterContentInit` lifecycle hook, not during initialization.                                                                       |
| ❌ | Component initialization cannot access or manipulate projected content.                                                                                                   |
| ❌ | Lacks strong typing, making it harder to ensure type safety for projected content.                                                                                            |
| ⚠️ | Using multiple ng-content slots adds complexity, but enables powerful component compositions when used carefully. |
| ✅ | Creates flexible and reusable components through content projection features.                                                                                                      |
| ✅ | Provides direct access to projected content, making it easy to interact with nested elements.                                                                                                                       |


### Traditional Approach Explained
The classic way uses `@ContentChild()` and `@ContentChildren()` decorators along 
with the `<ng-content>` tag. This combination gives you flexible ways to 
project and manage content.

```typescript
// Parent component with content projection slots.
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
    // Access projected content after initialization.
    this.items.forEach(item => console.log(item.title));
  }
}

// Example usage in a parent component.
@Component({
  template: `
    <app-container>
      <app-item title="Item 1" />
      <app-item title="Item 2" />
    </app-container>
  `
})
```

### Modern Signal-Based Approach
Angular 17+ introduces signal-based versions with `contentChild()` and `contentChildren()`
functions. They work similarly, but give you the power of signals.

Full set of examples around this topic you can find in the [src/app/8-component-projection](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/8-component-projection) folder.


## Routing Parameters & Queries in Angular

[//]: # (<img src="/public/img/router.png" alt="x" style="width: 500px; height: auto;">)

<img src="/public/img/img.jpeg" alt="Inputs and Outputs" style="width: 500px; height:auto;">


### Routing Parameters

This section explores how to pass data between Angular components using route parameters.
This is especially helpful when you need to share information between components that aren't 
directly connected in your component tree.

To get started, you'll need to set up your routes in the configuration and pass them to the 
`provideRouter(routes)` function (or `RouterModule` if you're using the older approach). 
Once set up, you can pass values through these routes when navigating. Your components 
can then easily access these parameters.

#### Practical Uses of Routing Params
1. Most common use cae is navigation to detailed view of specific item.
2. Steps in multistep process or workflow, can help to keep track of the current step like `/checkout/step-2`.
3. Filtering Subsections of data like `products/category/electronics`.


| Status | Description                                                                                                                    |
|--------|--------------------------------------------------------------------------------------------------------------------------------|
| ❌ | Params are always strings, so you may need to parse or convert complex data types.                                           |
| ❌ | Sensitive data passed through the URL can be visible and prone to tampering.                                                   |
| ✅ | Allows passing data between components without direct parent-child relationships, enabling more flexible component interaction. |
| ✅ | Data in URL params is preserved during navigation and can be shared easily through links.                                      |
| ✅ | Components can easily access params via `ActivatedRoute` service.                                                     |


```typescript
// Sets up the routing configuration.
const routes = [
  { path: 'details/:id', component: ChildComponent },
];

const appConfig = {
  providers: [provideRouter(routes)]
};

// Parent component - handles navigation to details.
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

// Child component - displays the route parameter value.
@Component({
  selector: 'app-child',
  template: `{{ id() }}`,
})
class ChildComponent implements OnInit {
  id = signal('foo');
  activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id.set(params['id']); // Will display '123'.
    });
  }
}
```

Full set of examples around this topic you can find in the [src/app/9-routing-params](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/src/app/9-routing-params) folder.




### Routing Queries in Angular

Routing queries offer a perfect solution for handling optional parameters!
Unlike regular route parameters that are part of the URL path, query parameters 
come after a question mark (`?`) in your URL. For example: `localhost:4200/table?sort=asc`.
They're great for handling things like sorting, filtering, or page numbers.

You can add, change, or remove query parameters without changing your main route path.
Your components can then read these parameters to adjust what they show or how they behave.

#### How Are Query Parameters Different from Route Parameters?

- URL Structure:
   - Route parameters look like this:  `/details/123`
   - Query parameters look like this: `/details?id=123&sort=name&order=asc`


#### Practical Uses of Routing Queries
1. Filtering and Sorting e.g. list view data are common uses for query parameters.
2. Pagination - query parameters can be used to store the current page number.
3. Search terms - useful for any application that has a search feature, enhancing
user experience by allowing direct navigation to pre-searched results.
4. Pre-populating forms through link, query parameters can carry the necessary data
to populate form fields.

| Status | Description                                                                           |
|--------|---------------------------------------------------------------------------------------|
| ❌     | Can only handle string data, complex data types need parsing or conversion.           |
| ❌     | Sensitive data is exposed in the URL, making it vulnerable to tampering.            |
| ❌     | Handling large or nested data with query params can become messy.                     |
| ❌     | Browser URL length limits restrict passing large data sets via query params.          |
| ❌     | Not suitable for real-time communication, only for passing state during navigation.   |
| ✅     | Easy to share application state across users or sessions.                        |
| ✅     | Persist in the URL, allowing bookmarking and sharing links with current state.        |
| ✅     | Ideal for optional, changeable data that doesn't define the route.                    |
| ✅     | Can pass multiple key-value pairs in a single URL, making it flexible for data sharing. |

```typescript
// Parent component - handles navigation to details page.
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

// Child component - displays the query parameter values.
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


### Using `withComponentInputBinding()` for Easier Routing 

Angular 16+ introduced a game-changing feature that does exactly that! Let's explore how 
`withComponentInputBinding()` makes routing and data handling much smoother.

This new approach creates a direct connection between your URL parameters and component inputs. 
It's like having an automatic pipeline that connects your URLs to your components, saving you 
from writing extra code!

To use this feature, you'll need the `withComponentInputBinding()` function from the Angular router. 
Once set up, the router will automatically connect your URL parameters to your component inputs when 
someone visits a page.


| Status | Description                                     |
|---------|-------------------------------------------------|
| ❌      | Can make routing more complex if used too much. |
| ❌      | Not great for complex data that changes often.  |
| ❌      | Data only flows one way.                        |
| ❌      | Types aren't checked automatically.             |
| ✅      | Clean, organized route setup.                   |
| ✅      | Components can talk through routes.             |
| ✅      | Less code needed.                               |

```typescript
// Parent component - handles navigation.
@Component({
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

// Child component - receives the ID.
@Component({
  template: `
    ID: {{ id }}
  `,
})
class RoutingInputChildComponent {
  // Changes to '155' when you click the button in the parent.
  @Input() id = 'default'; 
}
```

Full set of examples around this topic you can find in the [src/app/11-routing-input](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/11-routing-input) folder.


### Routing State Object 

When you perform navigation actions in Angular, you can also pass along a state 
object in the navigation extras. This object is transient, meaning it is only available
during the lifetime of the navigation and does not persist if the page is reloaded.

You can pass the state object using the `navigate()` method of the `Router` service, or through a 
`[routerLink]` directive with binding. Here's an example with `navigate()`:

Once you navigate to the destination component, you can access the state from the Router service. 
This is typically done in the ngOnInit lifecycle hook or directly in the constructor, depending on 
when you need to access the data.

#### Practical Uses of State Objects
1. Pre-populating - if you navigate to a form component, and you want pre-populate it with data from
    the previous component, you can pass this data through the state object.
2. Confirming actions - if a user performs an action, and you need to pass results 
  or confirmation messages to the next component, you can use the state object.
3. Avoid secure data in URL - if you have sensitive data that you don't want to expose in the URL, 
  you can pass it through the state object.


| Status | Description                                                                                                             |
|---------|-------------------------------------------------------------------------------------------------------------------------|
| ❌      | Does not work properly with SSR, because it lose the state.                                                             | |
| ❌      | Impossible to share a link to a specific application state with another user.                                           | |
| ❌      | State object is not inherently type-safe by default.                                                                    | |
| ⚠️      | Data passed in the state object is not retained after a refresh or if the navigation history is modified.               |
| ✅      | Ability to pass complex data objects between components during navigation.                                              |
| ✅      | Ability to pass complex data objects between components during navigation.                                              |
| ✅      | The router state object allows you to pass sensitive or personal data between components without exposing it in the URL |

```typescript
// Parent component - navigate to next component.
@Component({
  template: `
    <button (click)="changeRoute()">click</button>
  `,
})
class RoutingObjectStateParentComponent {
  router = inject(Router);
  
  changeRoute() {
    this.router.navigate(['router-object'], { state: { user: { name: 'Secret', value: 30 }}});
  }
}

// Child component - receives the state object.
@Component({
  template: ``,
})
class RoutingObjectStateChildComponent {
  router = inject(Router);

  constructor() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationStart),
      map(() => this.router.getCurrentNavigation()?.extras.state),
    ).subscribe(state => {
      if (state) {
        console.log('Received state:', state);
      }
    });
  }
}
```

Full set of examples around this topic you can find in the [src/app/12-routing-object](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/12-routing-object) folder.