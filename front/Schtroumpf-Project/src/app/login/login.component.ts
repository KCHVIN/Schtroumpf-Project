import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  checkHttp: Observable<any>;
  isCorrect: boolean = true;
  errorMessage: string;

  constructor(private request: RequestService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  sendConnexionRequest()
  {
    const body = {
      schtroumpf_login: this.registerForm.get('username').value,
      schtroumpf_password: this.registerForm.get('password').value,
    };

    let httpParams = this.request.transformBodyToHttpParam(body);


    this.checkHttp = this.request.post('schtroumpflogin', httpParams.toString());
    this.checkHttp.subscribe(data => {
      if (data.token && data._id) {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('id', data._id);
        location.assign("/carnet");
        this.isCorrect = true;
      }
    }, err => {
      this.isCorrect = false;
      this.errorMessage = "Mauvais identifiant ou mot de passe fournit";
    });
  }

}
