import {Component, ViewChildren, QueryList, viewChildren} from "@angular/core";
import {ChildComponent} from "./child.component";

@Component({
  selector: 'app-8-view-children',
  standalone: true,
  template: `
    <h1>8. View Children</h1>
    @for (val of [1, 2, 3]; track $index) {
      <app-7-view-child-old-child/>
    }
    <button (click)="click()">Call Child Method</button>
  `,
  imports: [ChildComponent]
})
export class ViewChildrenComponent {
  // old way of using ViewChildren
  @ViewChildren(ChildComponent) children!: QueryList<ChildComponent>;

  // new way with signals of using ViewChildren
  childrenNew = viewChildren<ChildComponent>(ChildComponent);

  click(): void {
    this.children.forEach(child => child.someChildMethod());
    this.childrenNew().forEach(child => child.someChildMethod());
  }
}
