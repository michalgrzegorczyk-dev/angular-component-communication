import {Injectable, signal} from "@angular/core";


//todo make old and new observables and signals
@Injectable({
  providedIn: 'root'
})
export class Service {
  readonly value = signal('initial');

  setValue(value: string) {
    this.value.set(value);
  }
}
