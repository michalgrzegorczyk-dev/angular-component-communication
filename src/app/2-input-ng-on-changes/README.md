### `ngOnChanges` Lifecycle Hook

Angular offers another way to handle input changes: the `ngOnChanges` 
lifecycle hook. This method runs when a component's input 
properties change. It's similar to input setter methods but more powerful.

| Status | Description                                                                 |
|--------|-----------------------------------------------------------------------------|
| ❌ | Runs for every input change, which may impact performance if overused.      |
| ❌ | Triggers for any input change, even if you only care about specific inputs. |
| ❌ | Need to hold additional property to show it on the view                     |
| ✅ | It can handle multiple inputs at once                                       |
| ✅ | It lets you check if it's the first change                                  | |
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
