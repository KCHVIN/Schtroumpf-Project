import { Component, OnInit, Injectable } from '@angular/core';
import { RequestService, Schtroumpf } from '../request.service'
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-schtroumpf',
  templateUrl: './list-schtroumpf.component.html',
  styleUrls: ['./list-schtroumpf.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class ListSchtroumpfComponent implements OnInit, CanActivate {

  registerForm: FormGroup;

  displayOrNot: boolean = true;
  config: Schtroumpf[] = [];
  myFriends: string[];

  hideme = [];
  checkHttp: Observable<any>;

  constructor(private request: RequestService, private formBuilder: FormBuilder, private router: Router)
  {
    this.getRequest();
  }

  canActivate(): boolean {
    if (this.request.isSigned() == false) {
      this.router.navigate([''])
      return false
    }
    return true;
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

  getRequest()
  {
    this.checkHttp = this.request.get('schtroumpf/' + sessionStorage.getItem("id"));

    this.checkHttp.subscribe(
      (data: Schtroumpf[]) => {
        this.config = [ ...data ];
        this.config = this.config.filter(element => element._id.toString() != sessionStorage.getItem('id'));
        this.getMyFriends();
      });
  }

  getMyFriends()
  {
    this.checkHttp = this.request.get('myaccount/' + sessionStorage.getItem("id"));

    this.checkHttp.subscribe(
      (data: any) => {
        this.myFriends = data.friends;
      });
  }

  deleteElement(elem)
  {
    const body = {
      name: elem
    };
    let httpParams = this.request.transformBodyToHttpParam(body);

    this.checkHttp = this.request.put('friendschtroumpf/' + sessionStorage.getItem('id'), httpParams.toString());
    this.checkHttp.subscribe(data => {
      if (data) {
        this.getRequest();
      }
    }, err => {
      console.log("Error == ", err);
    });
  }

  deconnect()
  {
    sessionStorage.clear();
    this.router.navigate([''])
  }
}
