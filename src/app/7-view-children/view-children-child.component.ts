import {Component} from "@angular/core";

@Component({
  selector: 'app-7-view-children-child',
  standalone: true,
  template: `
    <h2>app-7-view-children-child</h2>
  `,
})
export class ViewChildrenChildComponent {
  readonly #someChildField = 'Field Value';

  someChildMethod(): void {
    console.log(this.#someChildField);
  }
}
