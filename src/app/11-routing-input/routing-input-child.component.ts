import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-11-routing-input-child',
  template: `
    <h2>app-11-routing-input</h2>
    ID: {{ id }}
  `,
  standalone: true
})
export class RoutingInputChildComponent {
  @Input()
  id = 'default';
}
