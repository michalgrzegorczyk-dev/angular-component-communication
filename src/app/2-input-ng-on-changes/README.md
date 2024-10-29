### Understanding `ngOnChanges` Lifecycle Hook

Let's explore `ngOnChanges`, a helpful lifecycle hook in Angular that tracks changes to 
your component's input values. When inputs change, Angular automatically runs 
this method, providing you with `SimpleChanges` that tell you three key things:
what changed, if it's the first change, and both the old and new values.

| Status | Description                                                                                    |
|--------|------------------------------------------------------------------------------------------------|
| ❌ | Executes on every input change, which may affect performance if not used carefully. |
| ❌ | Runs for all input changes, even when you're interested in specific ones only.              |
| ❌ | Requires setting up additional properties to track changes.                                                  |
| ✅ | Efficiently handles multiple input changes in a single lifecycle hook.               |
| ✅ | Provides easy detection of first-time changes to input properties.                                 | |
| ✅ | Enables comparison between previous and current input values.                                               | |

```typescript 
// Component that tracks input changes.
@Component()
class Component implements OnChanges {
  input1 = input('initial');
  value = signal('');

  ngOnChanges(changes: SimpleChanges) {
    if (changes['input1'].isFirstChange()) {
      // Handle first change of input1.
      console.log(changes['input1'].currentValue);
    } else {
      // Compare previous and current values.
      console.log(changes['input1'].previousValue);
      console.log(changes['input1'].currentValue);
      this.value.set(changes['input1'].currentValue);
    }
  }
}
```

Full set of examples around this topic you can find in the [2-input-ng-on-changes](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/2-input-ng-on-changes) folder.
