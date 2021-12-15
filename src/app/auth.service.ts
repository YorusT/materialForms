import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ICredentials } from './shared/models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  signIn(credentials: ICredentials): Observable<boolean> {
    const success = Math.random() > 0.5;
    const response = success ? of(true) : of(true);
    return timer(2000).pipe(switchMap(() => response));
  }

  signUp(credentials: ICredentials): Observable<boolean> {
    const success = Math.random() > 0.5;
    const response = success ? of(true) : of(true);
    return timer(2000).pipe(switchMap(() => response));
  }
}
