import {Component, input} from "@angular/core";
import {InputOutputParentNewComponent} from "./input-output-parent-new.component";

@Component({
  selector: 'app-1-input-output-child-new',
  standalone: true,
  template: `
    <h1>app-1-input-output-child-new</h1>
    <p>Input 1: {{ input1() }}</p>
    <p>Input 2: {{ input2() }}</p>

    <p>Input From Parent: {{ parentInput() }}</p>
  `,
})
export class InputOutputChildNewComponent extends InputOutputParentNewComponent {
  input1 = input('initial');
  input2 = input('initial', {
    alias: 'aliasNameInput',
    transform: (value: string) => value + "!",
  });
}
