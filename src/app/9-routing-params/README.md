## Routing Parameters & Queries in Angular

<img src="/public/img/router.png" alt="x" style="width: 500px; height: auto;">

### Routing Parameters

Let's explore how to pass data between Angular components using route parameters. 
This is especially helpful when you need to share information between components that aren't 
directly connected in your component tree.

To get started, you'll need to set up your routes in the configuration and pass them to the 
`provideRouter(routes)` function (or `RouterModule` if you're using the older approach). 
Once set up, you can pass values through these routes when navigating. Your components 
can then easily access these parameters.

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


