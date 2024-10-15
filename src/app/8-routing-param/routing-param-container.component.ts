import {Component, inject, OnInit} from "@angular/core";
import {RouterOutlet, Router} from "@angular/router";

@Component({
  selector: 'app-8-routing-param-container',
  standalone: true,
  template: `
    <h1>app-8-routing-param-container</h1>
    <button (click)="goToDetail()">Go to detail</button>
    <router-outlet/>
  `,
  imports: [RouterOutlet]
})
export class RoutingParamContainerComponent implements OnInit {
  readonly #router = inject(Router);

  ngOnInit(): void {
    this.#router.navigate(['/']);
  }

  async goToDetail(): Promise<void> {
    await this.#router.navigate(['/detail', '123']);
  }
}
