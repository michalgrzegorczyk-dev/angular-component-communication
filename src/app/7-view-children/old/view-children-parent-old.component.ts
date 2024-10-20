import {Component, ViewChildren, QueryList, viewChildren} from "@angular/core";
import {ViewChildrenChildComponent} from "../view-children-child.component";

@Component({
  selector: 'app-7-view-children-parent-old',
  standalone: true,
  template: `
    <h1>app-7-view-children-parent-old</h1>
    @for (val of [1, 2, 3]; track $index) {
      <app-7-view-children-child/>
    }
    <button (click)="click()">Call Child Methods</button>
  `,
  imports: [ViewChildrenChildComponent]
})
export class ViewChildrenParentOldComponent {
  // old way of using ViewChildren
  @ViewChildren(ViewChildrenChildComponent) children!: QueryList<ViewChildrenChildComponent>;

  click(): void {
    this.children.forEach(child => child.someChildMethod());
  }
}
