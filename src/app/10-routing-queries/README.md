### Routing Queries in Angular

Routing queries offer a perfect solution for handling optional parameters!
Unlike regular route parameters that are part of the URL path, query parameters 
come after a question mark (`?`) in your URL. For example: `localhost:4200/table?sort=asc`.
They're great for handling things like sorting, filtering, or page numbers.

You can add, change, or remove query parameters without changing your main route path.
Your components can then read these parameters to adjust what they show or how they behave.

#### How Are Query Parameters Different from Route Parameters?

- URL Structure:
   - Route parameters look like this:  `/details/123`
   - Query parameters look like this: `/details?id=123&sort=name&order=asc`


#### 💡 Practical Uses of Routing Queries
1. Filtering and Sorting e.g. list view data are common uses for query parameters.
2. Pagination - query parameters can be used to store the current page number.
3. Search terms - useful for any application that has a search feature, enhancing
user experience by allowing direct navigation to pre-searched results.
4. Pre-populating forms through link, query parameters can carry the necessary data
to populate form fields.

| Good/Bad | Description                                                                           |
|--------|---------------------------------------------------------------------------------------|
| ❌     | Can only handle string data, complex data types need parsing or conversion.           |
| ❌     | Sensitive data is exposed in the URL, making it vulnerable to tampering.            |
| ❌     | Handling large or nested data with query params can become messy.                     |
| ❌     | Browser URL length limits restrict passing large data sets via query params.          |
| ❌     | Not suitable for real-time communication, only for passing state during navigation.   |
| ✅     | Easy to share application state across users or sessions.                        |
| ✅     | Persist in the URL, allowing bookmarking and sharing links with current state.        |
| ✅     | Ideal for optional, changeable data that doesn't define the route.                    |
| ✅     | Can pass multiple key-value pairs in a single URL, making it flexible for data sharing. |

```typescript
// Parent component - handles navigation to details page.
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

// Child component - displays the query parameter values.
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

Full set of examples around this topic you can find in the [src/app/9-routing-queries](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/9-routing-queries) folder.

---
