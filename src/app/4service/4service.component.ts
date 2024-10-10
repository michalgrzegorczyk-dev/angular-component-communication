import {Component, inject} from "@angular/core";
import {Service} from "./4service.service";

@Component({
  selector: 'app-4service',
  standalone: true,
  template: `
    <h1>4.Service</h1>
    <p>Value From Service: {{ value() }}</p>
  `,
})
export class ServiceComponent {
  #service = inject(Service);
  value = this.#service.value;
}
