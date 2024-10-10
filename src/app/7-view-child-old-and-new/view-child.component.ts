import {Component, ViewChild, viewChild} from "@angular/core";
import {ViewChildChildComponent} from "./child.component";

@Component({
  selector: 'app-7-view-child',
  standalone: true,
  template: `
    <h1>7. View Child</h1>
    <app-7-view-child-child #viewChildChildComponent />
    <button (click)="click()">Call Child Method</button>
  `,
  imports: [ViewChildChildComponent]
})
export class ViewChildComponent {
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
