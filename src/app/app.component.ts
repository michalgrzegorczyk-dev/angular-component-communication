import {Component, signal, OnInit, inject} from '@angular/core';
import {InputOutputComponent} from "./1-input-output-old-and-new/1input-output.component";
import {InputOutputSignalsComponent} from "./2input-output-signals/2input-output-signals.component";
import {InputOutputParentComponent} from "./1-input-output-old-and-new/1input-output-parent.component";
import {InputNgOnChangesComponent} from "./3input-ng-on-changes/3input-ng-on-changes.component";
import {ServiceComponent} from "./4service/4service.component";
import {Service} from "./4service/4service.service";
import {TemplateVariableParentComponent} from "./5-template-variable/parent.component";
import {ConstructorComponentParentComponent} from "./6-constructor-component/parent.component";
import {ViewChildComponent} from "./7-view-child-old-and-new/view-child.component";
import {ViewChildrenComponent} from "./8-view-children-old-and-new/view-children.component";
import {ParentComponent} from "./9-routing-param/parent.component";
import {RoutingQueryParentComponent} from "./10-routing-query/routing-query-parent.component";

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
    ViewChildComponent,
    ViewChildComponent,
    ViewChildrenComponent,
    ParentComponent,
    RoutingQueryParentComponent,
  ],
  template: `
    <div class="box">
        <app-1input-output input1="Hello" superInput="World" input3="Example" parentInput="ParentInput"
                       (output)="outputHandler()"/>
    </div>

    <div class="box">
        <app-1input-output-parent parentInput="parent"/>
    </div>

    <div class="box">
        <app-2input-output-signals [input1]="input1Signal()" [aliasNameInput]="input2Signal()"/>
    </div>

    <div class="box">
        <app-3input-ng-on-changes [input1]="input3Signal()"/>
    </div>

    <div class="box">
        <app-4service/>
    </div>

    <div class="box">
      <app-5-template-variable-parent/>
    </div>

    <div class="box">
      <app-6-constructor-component-parent/>
    </div>

    <div class="box">
      <app-7-view-child/>
    </div>

    <div class="box">
      <app-8-view-children/>
    </div>

    <div class="box">
      <app-9-routing/>
    </div>

    <div class="box">
      <app-10-routing-query />
    </div>

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
