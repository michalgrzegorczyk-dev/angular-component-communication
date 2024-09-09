import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-input-output-parent',
  standalone: true,
  template: `
    <h1>Input and Output Parent</h1>
    <p>Input 1: {{ parentInput }}</p>
  `,
})
export class InputOutputParentComponent {
  @Input() parentInput = '';
}
