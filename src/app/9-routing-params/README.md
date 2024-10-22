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


