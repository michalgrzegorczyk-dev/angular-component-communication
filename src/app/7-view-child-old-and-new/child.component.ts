import {Component} from "@angular/core";

@Component({
  selector: 'app-7-view-child-child',
  standalone: true,
  template: `
    <h2>Child</h2>
  `,
})
export class ViewChildChildComponent {
  readonly #someChildField = 'field from child component';

  someChildMethod(): void {
    console.log(this.#someChildField);
  }
}
