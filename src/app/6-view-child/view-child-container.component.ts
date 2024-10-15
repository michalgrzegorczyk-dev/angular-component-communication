import {Component, ViewChild, viewChild} from "@angular/core";
import {ViewChildChildComponent} from "./view-child.component";

@Component({
  selector: 'app-6-view-child-container',
  standalone: true,
  template: `
    <h1>app-6-view-child-container</h1>
    <app-6-view-child #viewChildChildComponent/>
    <button (click)="click()">Call Child Method</button>
  `,
  imports: [ViewChildChildComponent]
})
export class ViewChildContainerComponent {
  // old way of using ViewChild
  @ViewChild(ViewChildChildComponent)
  childComponentOld!: ViewChildChildComponent;

  // new way with signals of using ViewChild
  childComponentNew = viewChild.required<ViewChildChildComponent>('viewChildChildComponent');

  click(): void {
    this.childComponentOld.someChildMethod();
    this.childComponentNew().someChildMethod();
  }
}
