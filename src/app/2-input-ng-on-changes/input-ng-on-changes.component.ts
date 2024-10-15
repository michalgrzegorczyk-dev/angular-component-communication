import {Component, OnChanges, SimpleChanges, input, signal} from "@angular/core";

@Component({
  selector: 'app-2-input-ng-on-changes',
  standalone: true,
  template: `
    <h1>app-2-input-ng-on-changes</h1>
    <p>Value: {{ value() }}</p>
  `,
})
export class InputNgOnChangesComponent implements OnChanges {
  input1 = input('initial');
  readonly value = signal('');

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected:', changes);

    if (changes['input1'].isFirstChange()) {
      console.log('input1, currentValue:', changes['input1'].currentValue);
    } else {
      console.log('input1, previousValue', changes['input1'].previousValue);
      console.log('input1, currentValue:', changes['input1'].currentValue);
      this.value.set(changes['input1'].currentValue);
    }
  }
}
