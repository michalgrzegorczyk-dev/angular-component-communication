import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, Routes} from "@angular/router";
import {RoutingParamContainerComponent} from "./8-routing-param/routing-param-container.component";
import {RoutingParamChildComponent} from "./8-routing-param/routing-param-child.component";
import {ChildComponent as QueryChildComponent} from "./10-routing-query/child.component";

const routes: Routes = [
  { path: 'detail/:id', component: RoutingParamChildComponent },
  { path: 'detail-query', component: QueryChildComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes)]
};
