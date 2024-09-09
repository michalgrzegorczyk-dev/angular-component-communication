import {Component, Input} from "@angular/core";
import {InputOutputParentComponent} from "./input-output-parent.component";

@Component({
  selector: 'app-input-output',
  standalone: true,
  template: `
    <h1>Input and Output</h1>
    <p>Input 1: {{input1}}</p>
    <p>Input 2: {{input2}}</p>
    <p>Input 3: {{input3Internal}}</p>
    <p>Input 4: {{parentInput}}</p>
  `,
  // inherited from parent component
  inputs: ['parentInput'],
})
export class InputOutputComponent extends InputOutputParentComponent{
  // basic input
  @Input() input1 = '';

  // input with alias and transform
  @Input({required: true, alias: 'superInput', transform: (val:string) => val + '!'}) input2 = '';

  // input with setter
  @Input()
  set input3(val: string) {
    this.input3Internal = val;
  }

  input3Internal = '';
}
