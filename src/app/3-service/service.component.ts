import {Component, inject, OnInit} from "@angular/core";
import {NewService} from "./new/service-new.service";
import {OldService} from "./old/service-old.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-3-service',
  standalone: true,
  template: `
    <h1>app-3-service</h1>
    <p>Value (new): {{ newValue() }}</p>
    <p>Value (old): {{ oldValue$ | async }}</p>
  `,
  imports: [AsyncPipe]
})
export class ServiceComponent implements OnInit {
  readonly #newService = inject(NewService);
  readonly newValue = this.#newService.value;

  readonly #oldService = inject(OldService);
  readonly oldValue$ = this.#oldService.value$;

  ngOnInit() {
    setTimeout(() => {
      this.#newService.setValue('new value');
      this.#oldService.setValue('new value');
    }, 2000);
  }
}
