import {computed, effect, inject, Injectable, signal} from "@angular/core";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #userSignal = signal<User | null>(null);

  user = this.#userSignal.asReadonly();

  isLoggedIn = computed(() => !!this.user());

  constructor(private httpService: HttpClient, private router: Router){

    const userLoaded = this.loadUserFromStorage();

    effect(() => {
      const user = this.user();
      if(user && !userLoaded) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      }
    })
  }

  async login(email: string, password: string): Promise<User> {
    const user$ = this.httpService.post<User>(`${environment.apiRoot}/login`, {
      email,
      password
    });

    const user = await firstValueFrom(user$);
    this.#userSignal.set(user);
    return user;
  }

  async logout() {
    localStorage.removeItem(USER_STORAGE_KEY);
    this.#userSignal.set(null);
    await this.router.navigateByUrl('/login');
  }

  private loadUserFromStorage(): boolean {
    const json = localStorage.getItem(USER_STORAGE_KEY);
    if(json) {
      const user = JSON.parse(json);
      this.#userSignal.set(user);
      return true;
    }
    return false;
  }
}
