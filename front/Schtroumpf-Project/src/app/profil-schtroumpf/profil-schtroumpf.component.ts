import { Component, OnInit, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RequestService, Schtroumpf } from '../request.service'
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil-schtroumpf',
  templateUrl: './profil-schtroumpf.component.html',
  styleUrls: ['./profil-schtroumpf.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class ProfilSchtroumpfComponent implements OnInit, CanActivate {

  registerForm: FormGroup;
  profileSchtroumpf: Schtroumpf;
  checkHttp: Observable<any>;

  constructor(private request: RequestService, private router: Router, private formBuilder: FormBuilder)
  {
    this.request.get('myaccount/' + sessionStorage.getItem('id')).subscribe(
      (data: any) => {
        this.profileSchtroumpf = data;
      });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      age: ['', Validators.required],
      name: ['', ],
      family: ['', Validators.required],
      race: ['', [Validators.required]],
      food: ['', [Validators.required]],
    });
  }

  canActivate(): boolean
  {
    if (this.request.isSigned() == false) {
      this.router.navigate([''])
      return false
    }
    return true;
  }

  modificationProfil(elem)
  {
    const body = {
      name: this.registerForm.get('name').value,
      age: this.registerForm.get('age').value,
      family: this.registerForm.get('family').value,
      race: this.registerForm.get('race').value,
      food: this.registerForm.get('food').value,
    };
    let httpParams = new HttpParams();
    var self = this;

    Object.keys(body).forEach(function (key) {
      if (body[key] == '' || body[key] == null)
        body[key] = self.profileSchtroumpf[key];
      httpParams = httpParams.append(key, body[key]);
    });
    this.checkHttp = this.request.put('schtroumpf/' + sessionStorage.getItem('id'), httpParams.toString());
    this.checkHttp.subscribe(data => {
      if (data) {
        console.log("success == ", data)
      }
    }, err => {
      console.log(err);
    });
  }
}
