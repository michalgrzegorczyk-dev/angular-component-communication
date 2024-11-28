import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OldService {
  private readonly behaviorSubject$$ = new BehaviorSubject<string>('initial');
  readonly value$ = this.behaviorSubject$$.asObservable();

  setValue(value: string) {
    this.behaviorSubject$$.next(value);
  }
}
