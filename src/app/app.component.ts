import {Component, signal, OnInit, inject} from '@angular/core';
import {InputOutputChildOldComponent} from "./1-input-output/old/input-output-child-old.component";
import {InputOutputNewComponent} from "./1-input-output/new/input-output-new.component";
import {InputOutputParentOldComponent} from "./1-input-output/old/input-output-parent-old.component";
import {InputNgOnChangesComponent} from "./2-input-ng-on-changes/input-ng-on-changes.component";
import {ServiceComponent} from "./3-service/service.component";
import {TemplateVariableParentComponent} from "./4-template-variable/template-variable-container.component";
import {ConstructorComponentParentComponent} from "./5-injected-component/injected-component-parent.component";
import {ViewChildContainerComponent} from "./6-view-child/view-child-container.component";
import {ViewChildrenContainerComponent} from "./7-view-children/view-children-container.component";
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
    ViewChildContainerComponent,
    ViewChildContainerComponent,
    ViewChildrenContainerComponent,
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
      <app-3-service/>
    </div>

    <div class="box">
      <app-4-template-variable-container/>
    </div>

    <div class="box">
      <app-5-injected-component-parent/>
    </div>

    <div class="box">
      <app-6-view-child-container/>
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

  outputHandler() {
  }

  ngOnInit(): void {
    // Example 3
    setTimeout(() => this.input1Signal.set('Example'), 2000);
  }
}
