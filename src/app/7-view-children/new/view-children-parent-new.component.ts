import {Component, viewChildren} from "@angular/core";
import {ViewChildrenChildComponent} from "../view-children-child.component";

@Component({
  selector: 'app-7-view-children-parent-new',
  standalone: true,
  template: `
    <h1>app-7-view-children-parent-new</h1>
    @for (val of [1, 2, 3]; track $index) {
      <app-7-view-children-child/>
    }
    <button (click)="click()">Call Child Methods</button>
  `,
  imports: [ViewChildrenChildComponent]
})
export class ViewChildrenParentNewComponent {
  // new way with signals of using ViewChildren
  childrenNew = viewChildren<ViewChildrenChildComponent>(ViewChildrenChildComponent);

  click(): void {
    this.childrenNew().forEach(child => child.someChildMethod());
  }
}
