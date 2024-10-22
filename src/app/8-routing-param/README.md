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


