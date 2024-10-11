import {Component, inject} from "@angular/core";
import {RouterOutlet, Router} from "@angular/router";

@Component({
  selector: 'app-10-routing-query',
  standalone: true,
  template: `
    <h2>app-10-routing-query</h2>
    <button (click)="goToDetail()">Go to detail</button>
    <router-outlet/>
  `,
  imports: [RouterOutlet]
})
export class RoutingQueryParentComponent {
  #router = inject(Router);

  async goToDetail(): Promise<void> {
    await this.#router.navigate(['/detail-query'], {
      queryParams: {
        id: '123',
        name: 'John Doe',
        role: 'Developer'
      }
    });
  }
}
