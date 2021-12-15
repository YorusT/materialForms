import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICredentials } from '../shared/models/models';
import { equalFieldsValidator } from '../utilities/equal-fields.validator';
import { RegistrationErrorStateMatcher } from '../utilities/registration-error-state.matcher';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @Output() signUp = new EventEmitter<ICredentials>();
  @Input() disabled = false;
  isPasswordVisible = false;
  matcher = new RegistrationErrorStateMatcher();

  registrationForm = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    passwordRepeat: ['', Validators.required]
  },
  {
    validator: equalFieldsValidator('password', 'passwordRepeat')
  });

  constructor(private fb: FormBuilder) { }

  toggleVisibility(){
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  submit(){
    if(this.registrationForm.valid){
      this.signUp.emit(this.registrationForm.value)
    }
  }

  ngOnInit(): void {
  }

}
