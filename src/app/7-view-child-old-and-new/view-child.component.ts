import {Component, ViewChild, viewChild} from "@angular/core";
import {ViewChildOldChildComponent} from "./child.component";

@Component({
  selector: 'app-7-view-child-old',
  standalone: true,
  template: `
    <h1>7. View Child Old</h1>
    <app-7-view-child-old-child #viewChildOldChildComponent />
    <button (click)="click()">Call Child Method</button>
  `,
  imports: [ViewChildOldChildComponent]
})
export class ViewChildOldComponent {
  // old way of using ViewChild
  @ViewChild(ViewChildOldChildComponent, {})
  childComponentOld!: ViewChildOldChildComponent;

  // new way with signals of using ViewChild
  childComponentNew = viewChild.required<ViewChildOldChildComponent>('viewChildOldChildComponent');

  click(): void {
    this.childComponentOld.someChildMethod();
    this.childComponentNew().someChildMethod();
  }
}
