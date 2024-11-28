import {Component, inject} from "@angular/core";
import {Router, NavigationStart} from "@angular/router";
import {filter, map} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-12-routing-object-child',
  template: `
    <h2>app-12-routing-object-child</h2>
  `,
  standalone: true
})
export class RoutingObjectChildComponent {

  private readonly router = inject(Router);

  constructor() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationStart),
      map(() => this.router.getCurrentNavigation()?.extras.state),
      takeUntilDestroyed(),
    ).subscribe(state => {
      if (state) {
        console.log('Received state:', state);
      }
    });
  }
}
