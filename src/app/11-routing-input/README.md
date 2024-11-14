### Using `withComponentInputBinding()` for Easier Routing 

Angular 16+ introduced a game-changing feature that does exactly that! Let's explore how 
`withComponentInputBinding()` makes routing and data handling much smoother.

This new approach creates a direct connection between your URL parameters and component inputs. 
It's like having an automatic pipeline that connects your URLs to your components, saving you 
from writing extra code!

To use this feature, you'll need the `withComponentInputBinding()` function from the Angular router. 
Once set up, the router will automatically connect your URL parameters to your component inputs when 
someone visits a page.

#### 💡 Practical Uses of Routing Input Binding
1. Product detail pages with product information in route (e.g., `/products/:productId`)
2. Blog post pages with slug parameters (e.g., `/blog/:category/:slug`)

| Good/Bad | Description                                     |
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

---
