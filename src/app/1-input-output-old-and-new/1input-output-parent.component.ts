import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-1input-output-parent',
  standalone: true,
  template: `
    <h1>1.2 Input and Output with Parent</h1>
    <p>Input 1: {{ parentInput }}</p>
  `,
})
export class InputOutputParentComponent {
  @Input() parentInput = '';
}
