import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../request.service'

import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})

export class CreateAccountComponent implements OnInit {

  constructor(private request: RequestService, private formBuilder: FormBuilder) { }

  checkHttp: Observable<any>;
  registerForm: FormGroup;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      age: ['', [Validators.required]],
      food: ['', [Validators.required]],
      family: ['', [Validators.required]],
      race: ['', [Validators.required]],
    });
  }

  createAccount()
  {
    const body = {
      schtroumpf_login: this.registerForm.get('username').value,
      schtroumpf_password: this.registerForm.get('password').value,
      age: this.registerForm.get('age').value,
      food: this.registerForm.get('food').value,
      family: this.registerForm.get('family').value,
      race: this.registerForm.get('race').value,
      friends: [""],
    };
    let httpParams = this.request.transformBodyToHttpParam(body);

    this.checkHttp = this.request.post('schtroumpfaccount', httpParams.toString());
    this.checkHttp.subscribe(data => {
      if (data) {
        if (sessionStorage.getItem('token') || sessionStorage.getItem('id'))
        {
            location.assign("carnet");
            sessionStorage.setItem('addfriend', this.registerForm.get('username').value);
        }
        else
        {
          location.assign("");
        }
      }
    }, err => {
      console.log(err)
    });
  }

}
