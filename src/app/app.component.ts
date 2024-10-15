import {Component, signal, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputOutputChildOldComponent} from "./1-input-output/old/input-output-child-old.component";
import {InputOutputChildNewComponent} from "./1-input-output/new/input-output-child-new.component";
import {InputOutputParentOldComponent} from "./1-input-output/old/input-output-parent-old.component";
import {InputNgOnChangesComponent} from "./2-input-ng-on-changes/input-ng-on-changes.component";
import {ServiceComponent} from "./3-service/service.component";
import {TemplateVariableParentComponent} from "./4-template-variable/template-variable-container.component";
import {ConstructorComponentParentComponent} from "./5-injected-component/injected-component-parent.component";
import {ViewChildContainerComponent} from "./6-view-child/view-child-container.component";
import {ViewChildrenContainerComponent} from "./7-view-children/view-children-container.component";
import {RoutingParamContainerComponent} from "./8-routing-param/routing-param-container.component";
import {RoutingQueryContainerComponent} from "./9-routing-query/routing-query-container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    InputOutputChildOldComponent,
    InputOutputChildNewComponent,
    InputOutputParentOldComponent,
    InputNgOnChangesComponent,
    ServiceComponent,
    TemplateVariableParentComponent,
    ConstructorComponentParentComponent,
    ViewChildContainerComponent,
    ViewChildrenContainerComponent,
    RoutingParamContainerComponent,
    RoutingQueryContainerComponent,
  ],
  template: `
    <div class="pagination">
      <button *ngFor="let page of pages"
              [class.active]="page === currentPage()"
              (click)="onPageChange(page)">
        {{ page }}
      </button>
    </div>

    <div [ngSwitch]="currentPage()">
      <div *ngSwitchCase="1" class="box">
        <app-1-input-output-parent-old parentInput="parent"/>
        <app-1-input-output-child-old input1="Hello"
                                      aliasInput="World"
                                      inputSetter="Example"
                                      parentInput="ParentInput"
                                      (output)="outputHandler()"/>
        <app-1-input-output-new [xxxx]="input1Signal()" [input1]="input1Signal()" [aliasNameInput]="input2Signal()"/>
      </div>

      <div *ngSwitchCase="2" class="box">
        <app-2-input-ng-on-changes [input1]="input1Signal()"/>
      </div>

      <div *ngSwitchCase="3" class="box">
        <app-3-service/>
      </div>

      <div *ngSwitchCase="4" class="box">
        <app-4-template-variable-container/>
      </div>

      <div *ngSwitchCase="5" class="box">
        <app-5-injected-component-parent/>
      </div>

      <div *ngSwitchCase="6" class="box">
        <app-6-view-child-container/>
      </div>

      <div *ngSwitchCase="7" class="box">
        <app-7-view-children-container/>
      </div>

      <div *ngSwitchCase="8" class="box">
        <app-8-routing-param-container/>
      </div>

      <div *ngSwitchCase="9" class="box">
        <app-9-routing-query-container/>
      </div>
    </div>
  `,
})
export class AppComponent implements OnInit {
  pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  readonly input1Signal = signal('input-1-signal');
  readonly input2Signal = signal('input-2-signal');
  readonly currentPage = signal(1);


  outputHandler() {
    // Handle output
  }

  ngOnInit(): void {
    setTimeout(() => this.input1Signal.set('Example'), 2000);
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }
}
