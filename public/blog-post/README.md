# Mastering Component Communication in Angular

## Introduction
When you build apps with Angular, you need to know how different
parts of your app can share information. This is called component
communication. In this blog post, I'll cover all possible ways to make 
components talk to each other, such as:

- Simple ways that are used most often
  - `@Input` and `@Output`, 
  - Setter methods
  - `OnChanges` lifecycle hook
  - Services
  - `@ViewChild` and `@ViewChildren`
  - Routing Params and Queries
  - Template reference variables
- Modern approaches (signals)
  - `input()` and `output()`
  - `viewChild()` and `viewChildren()`
  - router input //todo
- Rarely used techniques that can be helpful sometimes
  - Injecting parent components into child components
  - `@Input` inheritance

I'll also highlight some features that aren't usually 
thought of as component communication, but can actually help to 
share information.

Some of these ways are better than others. But it's good to know all
of them. This way, you can pick the best one for your case.

❗<u>The key here is a critical thinking and understanding context of the problem.</u>

I'll show you examples of each way. By the end, you'll know lots of
ways to make your Angular app's parts work together. Also, you can
check every example by yourself [under this link.](https://github.com/michalgrzegorczyk-dev/angular-component-communication)

Ready to learn? Let's start!


## Inputs & Outputs, Setters and OnChanges

<img src="/public/img/input.png" alt="x" style="width: 500px; height: auto;">

### Inputs & Outputs

The most fundamental way of enabling communication between components in Angular is through the use of `@Input()` and `@Output()` decorators.

- `@Input()` allows a child component to receive data from its parent.
- `@Output()` enables a child component to send data back to its parent.

To implement this communication:

1. Add `@Input()` and `@Output()` decorators to properties in the child component.
2. Pass data from the parent component to these decorated properties.

#### 1. Traditional Approach

The traditional method involves using `@Input()` and `@Output()` decorators as
described above. This approach has been a used in Angular development for 
years and is widely understood.

#### 2. Modern Approach with Signals

With newer versions of Angular, we can now use signals with the `input()`
and `output()` function instead of decorators.

#### Setter Methods

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

#### Input Inheritance

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

Full set of examples you can find in the [1-input-output](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/1-input-output) folder.


### Input handled by ngOnChanges lifecycle hook

While we've explored various ways to handle inputs in Angular, 
there's another powerful method that deserves attention: the 
`ngOnChanges` lifecycle hook. This approach offers a different 
perspective on managing input changes, providing more control and flexibility.


#### Understanding `ngOnChanges`
The `ngOnChanges` lifecycle hook is a method that gets called whenever 
an input property of a component changes. It allows you to react 
to these changes and perform actions based on the new values.

#### Key Features:

- Triggered for all input property changes
- Provides access to both current and previous values
- Allows for complex logic based on input changes


Let's look at how `ngOnChanges` can be implemented in a component:

```typescript
    input1 = input('initial');
    readonly value = signal('');
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['input1'].isFirstChange()) {
        console.log('input1, currentValue:', changes['input1'].currentValue);
      } else {
        console.log('input1, previousValue', changes['input1'].previousValue);
        console.log('input1, currentValue:', changes['input1'].currentValue);
        this.value.set(changes['input1'].currentValue);
      }
    }
```

Full set of examples you can find in the [src/app/2-input-ng-on-changes](src/app/2-input-ng-on-changes) folder.


### Services

<img src="/public/img/services.png" alt="x" style="width: 500px; height: auto;">

Services in Angular provide a powerful way to share data and 
functionality across components. They represent the third major method 
of component communication, alongside inputs/outputs and the `ngOnChanges` 
lifecycle hook.

While services can be a complex topic, especially when 
considering different provision strategies and scopes, we'll focus on the most common and straightforward approach: providing a service at the root level.

#### Root-Level Service Provision
When a service is provided at the root level, it becomes available to the 
entire application. This makes it an excellent choice for sharing data 
between components that aren't directly related in the component tree.

#### Key Benefits:

Global Accessibility: Any component can inject and use the service.
Singleton Instance: Only one instance of the service exists application-wide.
Centralized State Management: Ideal for managing application-wide state.

Let's take a look at how to create a service that can be used in 
components after being injected.

```typescript
// service
@Injectable({
  providedIn: 'root'
})
export class NewService {
  readonly value = signal('initial');

  setValue(value: string) {
    this.value.set(value);
  }
}

// component
export class ServiceComponent {
  readonly #valueFromService = inject(NewService).value;
}
```

Full set of examples you can find in the [src/app/3-service](src/app/3-service) folder.


### Template Variables

<img src="/public/img/template.png" alt="x" style="width: 500px; height: auto;">

Template variables are a powerful feature in Angular that enable direct 
communication between parent and child components through the template. 
They provide a way to reference elements or components in the template, 
allowing for more dynamic and interactive component interactions. 
For example, you can use template variables to access child component
and invoke its methods from the parent component.

#### How Template Variables Work

- Template variables are declared using the # symbol in the template.
- They can be assigned to elements, components, or directives.

#### Example 
Let's examine an example where we use a template variable to communicate 
between a parent component and a child TodoListComponent.

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
export class TodoListComponent {
  addTodo(todoList: TodoListComponent) {
    todoList.addTodo();
  }
}
```

Full set of examples you can find in the [src/app/4-template-variable](src/app/4-template-variable) folder.


### Injected Components

<img src="/public/img/injected-components.png" alt="x" style="width: 500px; height: auto;">

Injecting components is an advanced technique in Angular that
allows a child component to access its parent 
component directly. This method provides a powerful way to 
establish communication between components in a parent-child 
relationship.

#### How Injected Components Work
- The child component declares the parent component as a dependency in its constructor.
- The child can then access public properties and methods of the parent.

#### Important Considerations
- This technique only works within the component hierarchy. A child can only inject its direct parent or an ancestor in its component tree.
- It's not possible to inject "random" components that are not in the direct lineage.
- This approach can lead to tight coupling between components, so it should be used judiciously.
- Also, this technique is a showcase and from my observation is not widely used in real-world applications.

Let's examine an example of how to implement this technique:
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

Full set of examples you can find in the [src/app/5-injected-component](src/app/5-injected-component) folder.


## ViewChild and ViewChildren
<img src="/public/img/view-child.png" alt="x" style="width: 500px; height: auto;">

### View Child
`@ViewChild` is a powerful decorator in Angular that allows a parent component 
to access and interact with its child components directly. This technique 
provides a way to establish communication between components in a 
parent-child relationship through the template. 

#### 1. Traditional Approach
The traditional method involves using `@ViewChild()` decorator as described above.

#### 2. Modern Approach with Signals
In Angular v17+, there is a
new way to use ViewChild feature, with signals `viewChild()`.

#### How ViewChild Works

- The parent component uses the `@ViewChild` decorator to query its 
template for a child component.
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


### View Children
The `@ViewChildren` decorator in Angular is a powerful tool that allows a 
parent component to query and interact with multiple child components or 
elements in its template. It's similar to `@ViewChild`, but it returns a 
`QueryList` of elements or components instead of a single instance.

#### 1. Traditional Approach
The traditional method involves using `@ViewChildren()` decorator as 
described above.

#### 2. Modern Approach with Signals
Similar to `@ViewChild`, in Angular v17+ there is a new way to use 
`@ViewChildren` feature, with signal approach `viewChildren()`.

Let's take a look at the code example: 

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
  // old way of using ViewChildren
  @ViewChildren(ChildComponent) children!: QueryList<ChildComponent>;

  // new way with signals of using ViewChildren
  childrenNew = viewChildren<ChildComponent>(ChildComponent);

  click() {
    this.children.forEach(child => child.foo());
    this.childrenNew().forEach(child => child.foo());
  }
}

// child component
@Component({
  selector: 'app-child',
  template: `<h2>app-child</h2>`,
})
export class ChildComponent {
  foo() {
    console.log('bar');
  }
}
```

Full set of examples you can find in the [src/app/7-view-children](src/app/7-view-children) folder.


## Routing Params & Queries

<img src="/public/img/router.png" alt="x" style="width: 500px; height: auto;">

### Routing Parameters

Routing parameters provide a powerful way to pass data between components in 
Angular applications. This method is particularly useful when you need to 
share information across different views or components that are not 
directly related in the component tree.

#### How Routing Parameters Work
1. Parameters are defined in the route configuration and routes should be passed 
to `provideRouter(routes)` function.
2. When navigating to a route, you can pass values for these parameters.
3. The component associated with the route can then access these parameters.

To use routing parameters, you need to set up your routing configuration and 
implement the necessary components. Let's see how this works in practice.

```typescript
// app.config.ts
const routes = [
  {path: 'details/:id', component: RoutingParamChildComponent},
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
class RoutingParamParentComponent {
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
      this.id.set(params['id']); // <- '123'
    });
  }
}
```

Full set of examples you can find in the [src/app/8-routing-param](src/app/8-routing-param) folder.




### Routing Queries 

Routing queries provide a flexible way to pass optional data between
components in Angular applications. Unlike route parameters, which are part of
the route path, query parameters are appended to the URL after a question
mark (?) and are typically used for optional information such as sorting, 
filtering, or pagination.

#### How Routing Query Parameters Work
1. Query parameters are added to the URL after the route path.
2. They can be added, modified, or removed without changing the route.
3. Components can read these parameters to adjust their behavior or display.

#### Key Differences from Route Parameters

1. URL Structure:
   - Route params: /details/123
   - Query params: /details?id=123&sort=name&order=asc

2. Usage: Query params are ideal for optional, changeable data that doesn't define the route.
3. Multiple Values: You can easily pass multiple key-value pairs in query params.

Having some knowledge from previous examples, let's see how routing query:

```typescript
// parent component
goToDetails() {
  this.router.navigate(['/detail-query'], {
    queryParams: {
      id: '123',
      name: 'John Doe',
      role: 'Developer'
    }
  });
}


// child component
route = inject(ActivatedRoute);

ngOnInit() {
  this.route.queryParams.subscribe((params: Params) => {
    this.id = params['id'];
    this.name = params['name'];
    this.role = params['role'];
  });
}
```

Full set of examples you can find in the [src/app/9-routing-query](src/app/9-routing-query) folder.

## When it can feel like communication

### `@ContentChild` and `@ContentChildren`
While `@ContentChild` involves interaction with projected content, it's 
not traditionally considered component communication in the same way as 
`@ViewChild`. In `@ViewChild`, there’s a direct line between the parent and 
child components for controlling behavior, but `@ContentChild` is more about 
a child adapting to or interacting with content passed down from the parent, 
typically through `<ng-content>`.

### `*ngTemplateOutlet`
I wouldn't consider using `*ngTemplateOutlet` as traditional component 
communication because it's more about template projection and dynamic 
rendering than direct interaction between components. However, it does 
involve data passing between the parent and the dynamically rendered 
template, which can be seen as a form of indirect communication.

## Outro
That's it, we  finally reached to the end of the blog post. I covered all the 
ways of component communication in Angular, showed cases for old syntax and
most recent with usage of signals. I really hope you enjoyed reading it. 
If you have any questions, feel free to ask in the comments below. 

Thanks for reading! <br/>