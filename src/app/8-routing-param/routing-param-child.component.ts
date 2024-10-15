import {Component, signal, inject, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-8-routing-param-child',
  standalone: true,
  template: `
    <h2>app-8-routing-param-child</h2>
    {{ id() }}
  `,
})
export class RoutingParamChildComponent implements OnInit {
  readonly id = signal('000');
  #activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.#activatedRoute.params.subscribe(params => {
      this.id.set(params['id']);
    });
  }
}
