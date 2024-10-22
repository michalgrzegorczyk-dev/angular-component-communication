import {Component, Input, inject} from "@angular/core";
import {Router, RouterOutlet} from "@angular/router";
import {RoutingInputChildComponent} from "./routing-input-child.component";

@Component({
  selector: 'app-11-routing-input-parent',
  template: `
    <h2>app-11-routing-input-parent</h2>
    <button (click)="changeRoute('999')">Go to id: 999</button>
    <button (click)="changeRoute('155')">Go to id: 155</button>
    <router-outlet/>
  `,
  imports: [
    RoutingInputChildComponent,
    RouterOutlet
  ],
  standalone: true
})
export class RoutingInputParentComponent {

  readonly #router = inject(Router);

  changeRoute(id: string) {
    this.#router.navigate(['/router-input', id]);
  }
}
