import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, Routes} from "@angular/router";
import {ParentComponent} from "./9-routing-param/parent.component";
import {ChildComponent} from "./9-routing-param/child.component";
import {ChildComponent as QueryChildComponent} from "./10-routing-query/child.component";

const routes: Routes = [
  { path: 'detail/:id', component: ChildComponent },
  { path: 'detail-query', component: QueryChildComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes)]
};
