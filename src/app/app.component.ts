import {Component, signal, OnInit, inject} from '@angular/core';
import {InputOutputComponent} from "./1input-output/1input-output.component";
import {InputOutputSignalsComponent} from "./2input-output-signals/2input-output-signals.component";
import {InputOutputParentComponent} from "./1input-output/1input-output-parent.component";
import {InputNgOnChangesComponent} from "./3input-ng-on-changes/3input-ng-on-changes.component";
import {ServiceComponent} from "./4service/4service.component";
import {Service} from "./4service/4service.service";
import {TemplateVariableParentComponent} from "./5-template-variable/parent.component";
import {ConstructorComponentParentComponent} from "./6-constructor-component/parent.component";
import {ViewChildOldComponent} from "./7-view-child-old-and-new/view-child.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    InputOutputComponent,
    InputOutputSignalsComponent,
    InputOutputParentComponent,
    InputNgOnChangesComponent,
    ServiceComponent,
    TemplateVariableParentComponent,
    ConstructorComponentParentComponent,
    ViewChildOldComponent,
  ],
  template: `
    <app-1input-output input1="Hello" superInput="World" input3="Example" parentInput="ParentInput"
                       (output)="outputHandler()"/>
    <app-1input-output-parent parentInput="parent"/>
    <app-2input-output-signals [input1]="input1Signal()" [aliasNameInput]="input2Signal()"/>
    <app-3input-ng-on-changes [input1]="input3Signal()"/>
    <app-4service/>
    <app-5-template-variable-parent/>
    <app-6-constructor-component-parent/>
    <app-7-view-child-old/>
  `,
})
export class AppComponent implements OnInit {
  #service = inject(Service);
  readonly input1Signal = signal('input1Signal');
  readonly input2Signal = signal('input2Signal');
  readonly input3Signal = signal('input3Signal');

  outputHandler() {
  }

  ngOnInit(): void {
    // Example 3
    setTimeout(() => this.input3Signal.set('Example'), 2000);

    // Example 4
    setTimeout(() => this.#service.setValue('New Value From Service!'), 2000);
  }
}
