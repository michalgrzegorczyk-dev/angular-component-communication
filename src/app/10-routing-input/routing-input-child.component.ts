import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-10-routing-input-child',
  template: `
    <h2>app-10-routing-input</h2>
    ID: {{ id }}
  `,
  standalone: true
})
export class RoutingInputChildComponent {
  @Input()
  id = 'default';
}
