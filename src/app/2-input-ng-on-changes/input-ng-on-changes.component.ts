import {Component, OnChanges, SimpleChanges, input} from "@angular/core";

@Component({
  selector: 'app-2-input-ng-on-changes',
  standalone: true,
  template: `
    <h1>app-2-input-ng-on-changes</h1>
    <p>check console.log ;)</p>
  `,
})
export class InputNgOnChangesComponent implements OnChanges {
  input1 = input('initial');

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected:', changes);

    if (changes['input1'].isFirstChange()) {
      console.log('input1, currentValue:', changes['input1'].currentValue);
    } else {
      console.log('input1, previousValue', changes['input1'].previousValue);
      console.log('input1, currentValue:', changes['input1'].currentValue);
    }
  }
}
