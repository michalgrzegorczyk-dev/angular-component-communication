import {Component, ViewChild, viewChild} from "@angular/core";
import {ViewChildChildComponent} from "../view-child.component";

@Component({
  selector: 'app-6-view-child-parent-new',
  standalone: true,
  template: `
    <h1>app-6-view-child-parent-new</h1>
    <app-6-view-child/>
    <button (click)="click()">Call Child Method</button>
  `,
  imports: [ViewChildChildComponent]
})
export class ViewChildParentNewComponent {
  // new way with signals of using ViewChild
  childComponentNew = viewChild.required<ViewChildChildComponent>(ViewChildChildComponent);

  click(): void {
    this.childComponentNew().someChildMethod();
  }
}
