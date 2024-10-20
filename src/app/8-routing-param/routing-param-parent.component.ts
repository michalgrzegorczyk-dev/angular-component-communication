import {Component, inject, OnInit} from "@angular/core";
import {RouterOutlet, Router} from "@angular/router";

@Component({
  selector: 'app-8-routing-param-parent',
  standalone: true,
  template: `
    <h1>app-8-routing-param-parent</h1>
    <button (click)="goToDetails()">Go to detail</button>
    <router-outlet/>
  `,
  imports: [RouterOutlet]
})
export class RoutingParamParentComponent implements OnInit {
  readonly #router = inject(Router);

  async ngOnInit(): Promise<void> {
    await this.#router.navigate(['/']);
  }

  async goToDetails(): Promise<void> {
    await this.#router.navigate(['/details', '123']);
  }
}
