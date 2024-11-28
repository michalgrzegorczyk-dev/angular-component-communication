import {Component, ViewChild} from "@angular/core";
import {ViewChildChildComponent} from "../view-child.component";

@Component({
  selector: 'app-6-view-child-parent-old',
  standalone: true,
  template: `
    <h1>app-6-view-child-parent-old</h1>
    <app-6-view-child/>
    <button (click)="click()">Call Child Method</button>
  `,
  imports: [ViewChildChildComponent]
})
export class ViewChildParentOldComponent {
  @ViewChild(ViewChildChildComponent)
  childComponentOld!: ViewChildChildComponent;

  click(): void {
    this.childComponentOld.someChildMethod();
  }
}
