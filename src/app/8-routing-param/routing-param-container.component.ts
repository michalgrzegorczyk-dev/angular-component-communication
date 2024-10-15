import {Component, inject} from "@angular/core";
import {RouterOutlet, Router} from "@angular/router";

@Component({
  selector: 'app-8-routing-param-container',
  standalone: true,
  template: `
    <h2>app-8-routing-param-container</h2>
    <button (click)="goToDetail()">Go to detail</button>
    <router-outlet/>
  `,
  imports: [RouterOutlet]
})
export class RoutingParamContainerComponent {
  readonly #router = inject(Router);

  async goToDetail(): Promise<void> {
    await this.#router.navigate(['/detail', '123']);
  }
}
