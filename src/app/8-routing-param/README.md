## Routing Params & Queries

<img src="/public/img/router.png" alt="x" style="width: 300px; height: auto;">

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


