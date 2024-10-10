import {Injectable, signal} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Service {
  readonly value = signal('initial');

  setValue(value: string) {
    this.value.set(value);
  }
}
