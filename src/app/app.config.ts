import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, Routes, withComponentInputBinding} from "@angular/router";
import {RoutingParamChildComponent} from "./8-routing-param/routing-param-child.component";
import {RoutingQueryChildComponent as QueryChildComponent} from "./9-routing-query/routing-query-child.component";
import {RoutingInputChildComponent} from "./10-routing-input/routing-input-child.component";

const routes: Routes = [
  {
    path: 'details/:id',
    component: RoutingParamChildComponent
  },
  {
    path: 'router-input/:id',
    component: RoutingInputChildComponent
  },
  {
    path: 'detail-query',
    component: QueryChildComponent
  }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({
      eventCoalescing: true,
    }),
    provideRouter(routes, withComponentInputBinding()),
  ]
};
