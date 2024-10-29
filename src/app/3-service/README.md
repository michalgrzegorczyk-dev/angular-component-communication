## Services in Angular

<img src="/public/img/services.png" alt="x" style="width: 500px; height: auto;">

Let's explore one of the most powerful ways to share data between components in 
Angular - Services! While services can do many things, we'll focus on how they 
help components talk to each other when provided at the `root` level.

Think of a service as a central hub where components can store and access shared data. 
Any component can read from or write to this hub, creating a smooth two-way flow of information.

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
