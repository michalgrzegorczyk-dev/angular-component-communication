## Services

![x](/public/img/services.png)

### Component Communication via Services

Services in Angular provide a powerful way to share data and functionality across components. They represent the third major method of component communication, alongside inputs/outputs and the ngOnChanges lifecycle hook.

While services can be a complex topic, especially when considering different provision strategies and scopes, we'll focus on the most common and straightforward approach: providing a service at the root level.

#### Root-Level Service Provision
When a service is provided at the root level, it becomes available to the 
entire application. This makes it an excellent choice for sharing data 
between components that aren't directly related in the component tree.

#### Key Benefits:

Global Accessibility: Any component can inject and use the service.
Singleton Instance: Only one instance of the service exists application-wide.
Centralized State Management: Ideal for managing application-wide state.

Let's take a look at how to create a service that can be used in 
components after being injected.

```typescript
// service
@Injectable({
  providedIn: 'root'
})
export class NewService {
  readonly value = signal('initial');

  setValue(value: string) {
    this.value.set(value);
  }
}

// component
export class ServiceComponent {
  readonly #valueFromService = inject(NewService).value;
}
```

Full set of examples you can find in the [src/app/3-service](src/app/3-service) folder.
