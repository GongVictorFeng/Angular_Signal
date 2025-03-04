import {Injectable, Signal, signal, WritableSignal} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoadingService {

  #loadingSignal: WritableSignal<boolean> = signal(false);

  loading = this.#loadingSignal.asReadonly()

  loadingOn() {
    this.#loadingSignal.set(true);
  }

  loadingOff() {
    this.#loadingSignal.set(false);
  }
}
