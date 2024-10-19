import {Component, inject, OnInit} from "@angular/core";
import {RouterOutlet, Router} from "@angular/router";

@Component({
  selector: 'app-9-routing-query-container',
  standalone: true,
  template: `
    <h1>app-9-routing-query-container</h1>
    <button (click)="goToDetails()">Go to details</button>
    <router-outlet/>
  `,
  imports: [RouterOutlet]
})
export class RoutingQueryParentComponent implements OnInit {
  readonly #router = inject(Router);

  async ngOnInit(): Promise<void> {
    await this.#router.navigate(['/']);
  }

  async goToDetails(): Promise<void> {
    await this.#router.navigate(['/detail-query'], {
      queryParams: {
        id: '123',
        name: 'John Doe',
        role: 'Developer'
      }
    });
  }
}
