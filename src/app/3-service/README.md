## Services in Angular

<img src="/public/img/img3.png" alt="Inputs and Outputs" style="width: 500px; height:auto;">


Services are a fundamental feature in Angular that serve multiple purposes, with one 
of their most powerful uses being data sharing between components. When provided at
the `root` level, services create a centralized way for components to communicate and
exchange information effectively.

Think of a service as a central hub where components can store and access shared data. 
Any component can read from or write to this hub, creating a smooth two-way flow of information.

#### Practical Uses of Services
1. Store user login states, preferences, and session tokens, providing a consistent user experience across different parts of the application.
2. Manage all backend API calls from a single service, simplifying the process of fetching, posting, and handling data across components.
3. Creating utility functions used across multiple components (formatters, validators).

| Status | Description                                                                  |
|--------|------------------------------------------------------------------------------|
| ❌ | Requires understanding of Angular's dependency injection system.             |
| ⚠️ | Simple class that can be injected, usually used with Signals or Observables. |
| ✅ | Enables component communication without creating direct dependencies.        |
| ✅ | Works across multiple components throughout your application.                |
| ✅ | Provides a centralized place for sharing data and logic.                     |
| ✅ | Makes testing easier by separating concerns.                                 |


```typescript
// Service that manages shared data.
@Injectable({
  providedIn: 'root'
})
class NewService {
  value = signal('initial');

  setValue(value: string) {
    this.value.set(value);
  }
}

// Component using the shared service.
class ServiceComponent {
  service = inject(NewService);
  valueFromService = this.service.value;
  
  setValue(value: string) {
    this.service.setValue(value);
  }
}
```

Full set of examples around this topic you can find in the [3-service](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/3-service) folder.
