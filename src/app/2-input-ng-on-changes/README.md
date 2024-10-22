### `ngOnChanges` lifecycle Hook

Angular offers another way to handle input changes, the `ngOnChanges` 
lifecycle hook method. This method runs when a component's input 
properties change and provide some additional functionality due to SimpleChanges
parameter that is passed to it. Based on this parameter, you can check if
the input has changed, if it's the first change, and compare the new and old values.

| Status | Description                                                                 |
|--------|-----------------------------------------------------------------------------|
| ❌ | Runs for every input change, which may impact performance if overused.      |
| ❌ | Triggers for any input change, even if you only care about specific inputs. |
| ❌ | Need to set an additional property to set.                                  |
| ✅ | It can handle multiple inputs at once.                                      |
| ✅ | It lets you check if it's the first change.                                 | |
| ✅ | You can compare new and old values.                                         | |

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
