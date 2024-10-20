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
