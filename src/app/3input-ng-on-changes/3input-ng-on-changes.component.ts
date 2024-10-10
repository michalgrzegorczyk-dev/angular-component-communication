import {Component, OnChanges, SimpleChanges, input} from "@angular/core";

@Component({
  selector: 'app-3input-ng-on-changes',
  standalone: true,
  template: `
    <h1>3. Input ngOnChanges</h1>
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
