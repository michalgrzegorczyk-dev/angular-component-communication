### Services

<img src="/public/img/services.png" alt="x" style="width: 500px; height: auto;">

Services in Angular provide a probably most powerful way to share data across 
components, therefore while services can be a complex topic, we'll focus on the 
most common and straightforward approach, which is providing a service at 
the `root` level and focus on how we can communicate between components in easy way.

The most common way to use services in Angular is by usage of `BehaviorSubject` 
and `Observable`, or with the newer version of Angular, signals. A service can store a
value, and any component that needs to use or update that value can read to it.
Components can also send new values to the service, so it can be full two-way ecosystem.

In newer versions of Angular, signals make this process easier. Signals are a 
simpler way to work with observables, making it easier to subscribe to and update 
values in a more straightforward way, but here we're elaborating about 
component communication, so we will skip the details about different techniques that
can be implemented in services.

| Status | Description                                                               |
|--------|---------------------------------------------------------------------------|
| ❌ | Requires understanding of dependency injection, observables, and signals. |
| ❌ | Can introduce additional complexity for simple applications.              |
| ✅ | Allow components to communicate without direct dependencies.              |
| ✅ | Can be used across multiple components.                                   |


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
