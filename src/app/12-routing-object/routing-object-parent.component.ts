import {Component, inject, OnInit} from "@angular/core";
import {Router, RouterOutlet} from "@angular/router";
import {RoutingObjectChildComponent} from "./routing-object-child.component";

@Component({
  selector: 'app-12-routing-object-parent',
  template: `
    <h2>app-12-routing-object-parent</h2>
    <button (click)="changeRoute()">Send data via Router State Object</button>
  `,
  imports: [
    RoutingObjectChildComponent,
    RouterOutlet
  ],
  standalone: true
})
export class RoutingObjectParentComponent implements OnInit {
  private readonly router = inject(Router);

  async ngOnInit(): Promise<void> {
    await this.router.navigate(['/']);
  }

  async changeRoute(): Promise<void> {
    await this.router.navigate(['router-object'], {state: {user: {name: 'Secret', value: 30}}});
  }
}
