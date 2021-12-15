import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICredentials } from '../shared/models/models';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  isPasswordVisible = false;
  @Output() signIn = new EventEmitter<ICredentials>();
  @Input() disabled = false;

  constructor() { }

  toggleVisibility(){
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  ngOnInit(): void {
  }

}
