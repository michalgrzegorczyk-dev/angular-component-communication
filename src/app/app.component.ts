import {Component, signal, OnInit, inject} from '@angular/core';
import {InputOutputChildOldComponent} from "./1-input-output-old-and-new/old/input-output-child-old.component";
import {InputOutputNewComponent} from "./1-input-output-old-and-new/new/input-output-new.component";
import {InputOutputParentOldComponent} from "./1-input-output-old-and-new/old/input-output-parent-old.component";
import {InputNgOnChangesComponent} from "./2-input-ng-on-changes/input-ng-on-changes.component";
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
    InputOutputChildOldComponent,
    InputOutputNewComponent,
    InputOutputParentOldComponent,
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
      <app-1-input-output-child-old input1="Hello"
                                    aliasInput="World"
                                    inputSetter="Example"
                                    parentInput="ParentInput"
                                    (output)="outputHandler()"/>
      <app-1-input-output-parent-old parentInput="parent"/>
      <app-1-input-output-new [input1]="input1Signal()" [aliasNameInput]="input2Signal()"/>
    </div>

    <div class="box">
      <app-2-input-ng-on-changes [input1]="input1Signal()"/>
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
      <app-10-routing-query/>
    </div>

  `,
})
export class AppComponent implements OnInit {
  readonly input1Signal = signal('input-1-signal');
  readonly input2Signal = signal('input-2-signal');
  #service = inject(Service);

  outputHandler() {
  }

  ngOnInit(): void {
    // Example 3
    setTimeout(() => this.input1Signal.set('Example'), 2000);

    // Example 4
    setTimeout(() => this.#service.setValue('New Value From Service!'), 2000);
  }
}
