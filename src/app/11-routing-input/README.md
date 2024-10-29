### Routing Input with `withComponentInputBinding()` 

The final topic covers the combination of routing and input binding, which allows you to 
retrieve URL parameters directly through component inputs. This modern feature 
connects routing parameters with input binding, simplifying how components receive URL 
data. This approach was introduced in Angular version 16 and later.

To achieve such a connection, you need to use the `withComponentInputBinding()` function
from the Angular router. This function allows you to define a route configuration with
input bindings for components. When navigating to a route, the router will automatically
bind the URL parameters to the component inputs.

| Status | Description                                   |
|---------|-----------------------------------------------|
| ❌      | Can make routing config complex when overused |
| ❌      | Limited for complex/real-time data handling   |
| ❌      | One-way data binding only                     |
| ❌      | Not type-safe.                                |
| ✅      | Clean, centralized route config               |
| ✅      | Components communicate via routes             |
| ✅      | Direct route-to-input binding with less code  |

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
