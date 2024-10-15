import {Component, OnInit, inject} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-9-routing-query-child',
  standalone: true,
  template: `
    <h2>app-9-routing-query-child</h2>
    <p>ID: {{ id }}</p>
    <p>Name: {{ name }}</p>
    <p>Role: {{ role }}</p>
  `,
})
export class RoutingQueryChildComponent implements OnInit {
  id = '';
  name = '';
  role = '';

  readonly #route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.#route.queryParams.subscribe((params: Params) => {
      this.id = params['id'];
      this.name = params['name'];
      this.role = params['role'];
    });
  }
}
