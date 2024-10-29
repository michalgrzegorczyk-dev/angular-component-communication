### `ngOnChanges` lifecycle Hook

The `ngOnChanges` method is a special tool in Angular that helps track when 
information coming into a component changes. When you use this method in your 
component, Angular will run it automatically whenever the input values change. 
The method comes with useful information through something called SimpleChanges. 
This information tells you three important things: whether any input has actually
changed, if this is the very first time the input has changed, and what the input
value was before compared to what it is now.

| Status | Description                                                                                    |
|--------|------------------------------------------------------------------------------------------------|
| ❌ | Runs for every input change, which may impact performance if overused. Should be kept minimal. |
| ❌ | Triggers for any input change, even if you only care about specific inputs.                    |
| ❌ | Need to set an additional property to set.                                                     |
| ✅ | It can handle multiple inputs at once (but runs only when single input changes).               |
| ✅ | It lets you check if it's the first change in input property.                                  | |
| ✅ | You can compare new and old values of the input.                                               | |

```typescript 
@Component()
class Component implements OnChanges {
  input1 = input('initial');
  value = signal('');

  ngOnChanges(changes: SimpleChanges) {
    if (changes['input1'].isFirstChange()) {
      console.log(changes['input1'].currentValue);
    } else {
      console.log(changes['input1'].previousValue);
      console.log(changes['input1'].currentValue);
      this.value.set(changes['input1'].currentValue);
    }
  }
}
```

Full set of examples around this topic you can find in the [2-input-ng-on-changes](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/2-input-ng-on-changes) folder.
