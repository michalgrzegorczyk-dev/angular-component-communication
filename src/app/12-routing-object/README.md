### Routing State Object 

When you perform navigation actions in Angular, you can also pass along a state 
object in the navigation extras. This object is transient, meaning it is only available
during the lifetime of the navigation and does not persist if the page is reloaded.

You can pass the state object using the `navigate()` method of the `Router` service, or through a 
`[routerLink]` directive with binding. Here's an example with `navigate()`:

Once you navigate to the destination component, you can access the state from the Router service. 
This is typically done in the ngOnInit lifecycle hook or directly in the constructor, depending on 
when you need to access the data.

#### 💡 Practical Uses of State Objects
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

---
