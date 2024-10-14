import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OldService {
  readonly #behaviorSubject$$ = new BehaviorSubject<string>('initial');
  readonly value$ = this.#behaviorSubject$$.asObservable();

  setValue(value: string) {
    this.#behaviorSubject$$.next(value);
  }

  getValue$(): Observable<string> {
    return this.value$;
  }
}
