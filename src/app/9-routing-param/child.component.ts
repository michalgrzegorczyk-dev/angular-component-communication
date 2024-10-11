import {Component, signal, inject, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-parent',
  standalone: true,
  template: `
    <h2>Child</h2>
    {{id()}}
  `,
})
export class ChildComponent implements OnInit {
  readonly id = signal('000');
  #activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.#activatedRoute.params.subscribe(params => {
      this.id.set(params['id']);
    });
  }
}
// /detail?id=123&name=John%20Doe&role=Developer
