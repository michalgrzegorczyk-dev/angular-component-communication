import {Component} from "@angular/core";

@Component({
  selector: 'app-8-content-projection-child',
  template: `<p>{{ title }}</p>`,
  standalone: true
})
export class ContentProjectionChildComponent {
  title = 'Child Title';
}
