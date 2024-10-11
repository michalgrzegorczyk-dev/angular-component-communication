import {Component, inject} from "@angular/core";
import {RouterOutlet, Router} from "@angular/router";

@Component({
  selector: 'app-9-routing',
  standalone: true,
  template: `
    <h2>Parent</h2>
    <button (click)="goToDetail()">Go to detail</button>
    <router-outlet/>
  `,
  imports: [RouterOutlet]
})
export class ParentComponent {
  #router = inject(Router);

  async goToDetail(): Promise<void> {
    await this.#router.navigate(['/detail', '123']);
  }
}
