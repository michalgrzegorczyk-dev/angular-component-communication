import {Component, ViewChildren, QueryList, viewChildren} from "@angular/core";
import {ViewChildrenChildComponent} from "./view-children-child.component";

@Component({
  selector: 'app-7-view-children-container',
  standalone: true,
  template: `
    <h1>app-7-view-children-container</h1>
    @for (val of [1, 2, 3]; track $index) {
      <app-7-view-child-old-child/>
    }
    <button (click)="click()">Call Child Methods</button>
  `,
  imports: [ViewChildrenChildComponent]
})
export class ViewChildrenContainerComponent {
  // old way of using ViewChildren
  @ViewChildren(ViewChildrenChildComponent) children!: QueryList<ViewChildrenChildComponent>;

  // new way with signals of using ViewChildren
  childrenNew = viewChildren<ViewChildrenChildComponent>(ViewChildrenChildComponent);

  click(): void {
    this.children.forEach(child => child.someChildMethod());
    this.childrenNew().forEach(child => child.someChildMethod());
  }
}
