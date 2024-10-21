import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'app-1-input-output-parent-old',
  standalone: true,
  template: `
    <h1>app-1-input-output-parent-old</h1>
    <p>Input 1: {{ parentInput }}</p>
  `,
})
export class InputOutputParentOldComponent {
  @Input() parentInput = '';
  @Output() parentOutput = new EventEmitter<string>();
}
