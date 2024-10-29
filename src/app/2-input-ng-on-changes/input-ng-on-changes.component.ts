import {Component, OnChanges, SimpleChanges, input, signal} from "@angular/core";

@Component({
  selector: 'app-2-input-ng-on-changes',
  standalone: true,
  template: `
    <h1>app-2-input-ng-on-changes</h1>
    <p>Value: {{ value() }}</p>
    <p>Input1: {{ input1() }}</p>
    <p>Input2: {{ input2() }}</p>
  `,
})
export class InputNgOnChangesComponent implements OnChanges {
  input1 = input('initial1');
  input2 = input('initial2');
  readonly value = signal('');

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected:', changes);
    console.log('input2', changes['input2']);

    if (changes['input1'].isFirstChange()) {
      console.log('input1, currentValue:', changes['input1'].currentValue);
    } else {
      console.log('input1, previousValue', changes['input1'].previousValue);
      console.log('input1, currentValue:', changes['input1'].currentValue);
      this.value.set(changes['input1'].currentValue);
    }
  }
}
