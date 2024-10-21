### Services

<img src="/public/img/services.png" alt="x" style="width: 500px; height: auto;">

Services in Angular provide a powerful way to share data and 
functionality across components. They represent the third major approach 
of component communication, alongside inputs/outputs and the `ngOnChanges` 
lifecycle hook.

While services can be a complex topic, we'll focus on the 
most common and straightforward approach, which is providing a service at 
the root level and focus on how we can communicate between components.

The most common way to use services in Angular is by using BehaviorSubject and
Observable, or with the newer signals. A service can store a value, and any 
component that needs to use or update that value can subscribe to it. Components 
can also send new values to the service.

In newer versions of Angular, signals make this process easier. Signals are a 
simpler way to work with observables, making it easier to subscribe to and update 
values in a more straightforward way.

| Status | Description                                                            |
|--------|------------------------------------------------------------------------|
| ❌ | Requires understanding of dependency injection and (often) observables |
| ❌ | Can introduce additional complexity for simple applications            |
| ❌ | Requires understanding of RxJS or signals to handle data properly      |
| ✅ | Allow components to communicate without direct dependencies            |
| ✅ | Can be used across multiple components                                 |


```typescript
// service
@Injectable({
  providedIn: 'root'
})
class NewService {
  value = signal('initial');

  setValue(value: string) {
    this.value.set(value);
  }
}

// component
class ServiceComponent {
  service = inject(NewService);
  valueFromService = this.service.value;
  
  setValue(value: string) {
    this.service.setValue(value);
  }
}
```

Full set of examples around this topic you can find in the [3-service](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/3-service) folder.
