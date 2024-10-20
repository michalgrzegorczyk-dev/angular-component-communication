### Input handled by ngOnChanges lifecycle hook

While we've explored various ways to handle inputs in Angular, 
there's another powerful method that deserves attention: the 
`ngOnChanges` lifecycle hook. This approach offers a different 
perspective on managing input changes, providing more control and flexibility.


#### Understanding `ngOnChanges`
The `ngOnChanges` lifecycle hook is a method that gets called whenever 
an input property of a component changes. It allows you to react 
to these changes and perform actions based on the new values.

#### Key Features:

- Triggered for all input property changes
- Provides access to both current and previous values
- Allows for complex logic based on input changes


Let's look at how `ngOnChanges` can be implemented in a component:

```typescript
    input1 = input('initial');
    readonly value = signal('');
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['input1'].isFirstChange()) {
        console.log('input1, currentValue:', changes['input1'].currentValue);
      } else {
        console.log('input1, previousValue', changes['input1'].previousValue);
        console.log('input1, currentValue:', changes['input1'].currentValue);
        this.value.set(changes['input1'].currentValue);
      }
    }
```

Full set of examples you can find in the [src/app/2-input-ng-on-changes](src/app/2-input-ng-on-changes) folder.
