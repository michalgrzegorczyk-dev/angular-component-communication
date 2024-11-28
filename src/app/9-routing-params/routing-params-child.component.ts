import {Component, signal, inject, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-9-routing-param-child',
  standalone: true,
  template: `
    <h2>app-9-routing-param-child</h2>
    {{ id() }}
  `,
})
export class RoutingParamsChildComponent implements OnInit {
  readonly id = signal('foo');
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id.set(params['id']);
    });
  }
}
