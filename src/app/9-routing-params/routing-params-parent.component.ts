import {Component, inject, OnInit} from "@angular/core";
import {RouterOutlet, Router} from "@angular/router";

@Component({
  selector: 'app-9-routing-params-parent',
  standalone: true,
  template: `
    <h1>app-9-routing-params-parent</h1>
    <button (click)="goToDetails()">Go to detail</button>
    <router-outlet/>
  `,
  imports: [RouterOutlet]
})
export class RoutingParamsParentComponent implements OnInit {
  private readonly router = inject(Router);

  async ngOnInit(): Promise<void> {
    await this.router.navigate(['/']);
  }

  async goToDetails(): Promise<void> {
    await this.router.navigate(['/details', '123']);
  }
}
