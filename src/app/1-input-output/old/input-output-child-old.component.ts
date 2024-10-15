import {Component, Input, Output, EventEmitter} from "@angular/core";
import {InputOutputParentOldComponent} from "./input-output-parent-old.component";

@Component({
  selector: 'app-1-input-output-child-old',
  standalone: true,
  template: `
    <h1>app-1-input-output-child-old</h1>
    <p>Input 1: {{ input1 }}</p>
    <p>Input 2: {{ input2 }}</p>
    <p>Input 3: {{ input3Internal }}</p>
    <p>Input 4: {{ parentInput }}</p>
  `,
  // inherited from parent component
  inputs: ['parentInput'],
})
export class InputOutputChildOldComponent extends InputOutputParentOldComponent {
  // basic input
  @Input() input1 = '';

  // input with alias and transform
  @Input({required: true, alias: 'aliasInput', transform: (val: string) => val + '!'}) input2 = '';
  @Output()
  output = new EventEmitter<void>();
  input3Internal = '';

  // input with setter
  @Input()
  set inputSetter(val: string) {
    this.input3Internal = val;
  }
}
