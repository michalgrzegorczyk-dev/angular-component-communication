import {Component} from "@angular/core";

@Component({
  selector: 'app-6-view-child',
  standalone: true,
  template: `
    <h2>app-6-view-child</h2>
  `,
})
export class ViewChildChildComponent {
  private readonly someChildField = 'Field Value';

  someChildMethod(): void {
    console.log(this.someChildField);
  }
}
