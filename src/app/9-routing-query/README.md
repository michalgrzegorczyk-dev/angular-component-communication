### Routing Queries 

Routing queries provide a flexible way to pass optional data between
components in Angular applications. Unlike route parameters, which are part of
the route path, query parameters are appended to the URL after a question
mark `?`, e.g. `localhost:4200/table?sort=asc` and are typically used for optional 
information such as sorting, filtering, or pagination.

#### How Routing Query Parameters Work
1. Query parameters are added to the URL after the route path.
2. They can be added, modified, or removed without changing the route.
3. Components can read these parameters to adjust their behavior or display.

#### Key Differences from Route Parameters

- URL Structure:
   - Route params: /details/123
   - Query params: /details?id=123&sort=name&order=asc

- Query params are ideal for optional, changeable data that doesn't define the route.
- You can easily pass multiple key-value pairs in query params.


| Status | Description                                                                                                                  |
|--------|------------------------------------------------------------------------------------------------------------------------------|
| ❌     | Can only handle string data, complex data types need parsing or conversion.                                                   |
| ❌     | Sensitive data is exposed in the URL, making it vulnerable to tampering.                                                      |
| ❌     | Handling large or nested data with query params can become messy.                                                             |
| ❌     | Browser URL length limits restrict passing large data sets via query params.                                                  |
| ❌     | Not suitable for real-time communication, only for passing state during navigation.                                           |
| ✅     | Easy to share application state across users or sessions.                                                                     |
| ✅     | Query params persist in the URL, allowing bookmarking and sharing links with current state.                                   |
| ✅     | Can pass multiple key-value pairs in a single URL, making it flexible for data sharing.                                        |
| ✅     | Supports passing data without needing a direct parent-child component relationship, offering more flexible communication.      |

```typescript
// parent component
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

// child component
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

Full set of examples you can find in the [src/app/9-routing-query](src/app/9-routing-query) folder.
