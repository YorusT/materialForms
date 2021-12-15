import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, delay, exhaustMap, map, mapTo, merge, Observable, of, skip, Subject, takeUntil, withLatestFrom } from 'rxjs';
import { AuthService } from '../auth.service';
import { Mode, Status, ICredentials } from '../shared/models/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
// STATES
  public mode$ = new BehaviorSubject<Mode>("signin")
  public status$ = new BehaviorSubject<any>("initial")

//events
  public signIn$ = new Subject<ICredentials>();
  public signUp$ = new Subject<ICredentials>();
  private destroy$ = new Subject<void>();

  constructor(private authService : AuthService) { }

  sign$: Observable<boolean> = merge(
    this.signIn$.pipe(map((x): ['signin', ICredentials] => ['signin', x])),
    this.signUp$.pipe(map((x): ['signup', ICredentials] => ['signup', x]))
  ).pipe(
    exhaustMap(([type, ICredentials])=>{
      const call$ = type === 'signin'
      ?this.authService.signIn(ICredentials)
      :this.authService.signUp(ICredentials)

      return call$.pipe(
        mapTo(true),
        catchError(() => of(false))
      )
    })
  )

  test(x:any){
    console.log(x);

  }

  ngOnInit(): void {
    this.sign$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(e=>{
      this.status$.next( e ? 'success' : 'error');
    });
    merge(this.signIn$, this.signUp$).pipe(
      takeUntil(this.destroy$)
    ).subscribe(()=>{
      this.status$.next('pending');
    });

    this.status$.pipe(
      withLatestFrom(this.mode$),
      delay(500),
      takeUntil(this.destroy$)
    ).subscribe(([status, mode]) => {
      if (status === 'success' && mode === 'signin'){
        // this.router.navigateByUrl(./.);
      }
      if(status === 'success' && mode === 'signin'){
        this.mode$.next('signup')
      }
    });
  this.mode$.pipe(
    skip(1),
    takeUntil(this.destroy$)
  ).subscribe(()=>
  this.status$.next('initial'))
}

ngOnDestroy(){
  this.destroy$.next();
  this.destroy$.complete();
}


}
