import {Component, input} from "@angular/core";

@Component({
  selector: 'app-input-output-signals',
  standalone: true,
  template: `
    <h1>Input and Output Signals</h1>
    <p>Input 1: {{ input1() }}</p>
    <p>Input 2: {{ input2() }}</p>
  `,
})
export class InputOutputSignalsComponent {
  input1 = input('initial');
  input2 = input('initial', {
    alias: 'aliasNameInput',
    transform: (value: string) => value + "!",
  });
}
