import {Component, signal, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputOutputChildOldComponent} from "./1-input-output/old/input-output-child-old.component";
import {InputOutputChildNewComponent} from "./1-input-output/new/input-output-child-new.component";
import {InputOutputParentOldComponent} from "./1-input-output/old/input-output-parent-old.component";
import {InputNgOnChangesComponent} from "./2-input-ng-on-changes/input-ng-on-changes.component";
import {ServiceComponent} from "./3-service/service.component";
import {TemplateVariableParentComponent} from "./4-template-variable/template-variable-parent.component";
import {InjectedComponentParentComponent} from "./5-injected-component/injected-component-parent.component";
import {ViewChildParentOldComponent} from "./6-view-child/old/view-child-parent-old.component";
import {ViewChildrenParentNewComponent} from "./7-view-children/new/view-children-parent-new.component";
import {RoutingParamsParentComponent} from "./9-routing-params/routing-params-parent.component";
import {RoutingQueriesParentComponent} from "./10-routing-queries/routing-queries-parent.component";
import {ViewChildrenParentOldComponent} from "./7-view-children/old/view-children-parent-old.component";
import {ViewChildParentNewComponent} from "./6-view-child/new/view-child-parent-new.component";
import {RoutingInputParentComponent} from "./11-routing-input/routing-input-parent.component";
import {
  ContentProjectionParentNewComponent
} from "./8-content-projection/old/content-projection-parent-old.component";
import {ContentProjectionChildComponent} from "./8-content-projection/content-projection-child.component";
import {ContentProjectionParentOldComponent} from "./8-content-projection/new/content-projection-parent-new.component";

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
    InjectedComponentParentComponent,
    ViewChildParentOldComponent,
    ViewChildrenParentNewComponent,
    RoutingParamsParentComponent,
    RoutingQueriesParentComponent,
    ViewChildrenParentOldComponent,
    ViewChildParentNewComponent,
    RoutingInputParentComponent,
    ContentProjectionParentOldComponent,
    ContentProjectionChildComponent,
    ContentProjectionParentOldComponent,
    ContentProjectionParentNewComponent,
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
                                      (output)="outputHandler()"
                                      (parentOutput)="outputHandler()"
        />
        <app-1-input-output-child-new [input1]="input1Signal()" [aliasNameInput]="input2Signal()"/>
      </div>

      <div *ngSwitchCase="2" class="box">
        <app-2-input-ng-on-changes [input1]="input1Signal()"/>
      </div>

      <div *ngSwitchCase="3" class="box">
        <app-3-service/>
      </div>

      <div *ngSwitchCase="4" class="box">
        <app-4-template-variable-parent/>
      </div>

      <div *ngSwitchCase="5" class="box">
        <app-5-injected-component-parent/>
      </div>

      <div *ngSwitchCase="6" class="box">
        <app-6-view-child-parent-old/>
        <app-6-view-child-parent-new/>
      </div>

      <div *ngSwitchCase="7" class="box">
        <app-7-view-children-parent-new/>
        <app-7-view-children-parent-old/>
      </div>

      <div *ngSwitchCase="8" class="box">

        <app-8-content-projection-parent-old>
          <h1 #header>My Header</h1>
          <app-8-content-projection-child title="Item 1" />
          <app-8-content-projection-child title="Item 2" />
        </app-8-content-projection-parent-old>

        <app-8-content-projection-parent-new>
          <h1 #header>My Header</h1>
          <app-8-content-projection-child title="Item 1" />
          <app-8-content-projection-child title="Item 2" />
        </app-8-content-projection-parent-new>
      </div>

      <div *ngSwitchCase="9" class="box">
        <app-9-routing-params-parent/>

      </div>

      <div *ngSwitchCase="10" class="box">
        <app-10-routing-queries-parent/>

      </div>
      <div *ngSwitchCase="11" class="box">
        <app-11-routing-input-parent/>
      </div>
    </div>`,
})
export class AppComponent implements OnInit {
  pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11];

  readonly input1Signal = signal('input-1-signal');
  readonly input2Signal = signal('input-2-signal');
  readonly currentPage = signal(1);


  outputHandler() {
    // Handle output
    console.log('Output')
  }

  ngOnInit(): void {
    setTimeout(() => this.input1Signal.set('Example'), 2000);
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }
}
