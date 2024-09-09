import {Component, signal} from '@angular/core';
import {InputOutputComponent} from "./1input-output/input-output.component";
import {InputOutputSignalsComponent} from "./2input-output-signals/input-output-signals.component";
import {InputOutputParentComponent} from "./1input-output/input-output-parent.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    InputOutputComponent,
    InputOutputSignalsComponent,
    InputOutputParentComponent,
  ],
  template: `
    <app-input-output input1="Hello" superInput="World" input3="Example" parentInput="ParentInput"/>
    <app-input-output-parent parentInput="parent"/>
    <app-input-output-signals [input1]="input1Signal()" [aliasNameInput]="input2Signal()"/>
  `,
})
export class AppComponent {
  input1Signal = signal('input1Signal');
  input2Signal = signal('input2Signal');
}
