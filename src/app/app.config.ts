import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, Routes, withComponentInputBinding} from "@angular/router";
import {RoutingParamsChildComponent} from "./9-routing-params/routing-params-child.component";
import {
  RoutingQueriesChildComponent as QueryChildComponent
} from "./10-routing-queries/routing-queries-child.component";
import {RoutingInputChildComponent} from "./11-routing-input/routing-input-child.component";
import {RoutingObjectChildComponent} from "./12-routing-object/routing-object-child.component";

const routes: Routes = [
  {
    path: 'details/:id',
    component: RoutingParamsChildComponent
  },
  {
    path: 'router-input/:id',
    component: RoutingInputChildComponent
  },
  {
    path: 'detail-query',
    component: QueryChildComponent
  },
  {
    path: 'router-object',
    component: RoutingObjectChildComponent
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
