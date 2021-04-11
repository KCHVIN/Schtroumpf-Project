import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RequestService, Schtroumpf } from '../request.service'
import { Observable } from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-management-schtroumpf',
  templateUrl: './management-schtroumpf.component.html',
  styleUrls: ['./management-schtroumpf.component.css']
})
export class ManagementSchtroumpfComponent implements OnInit {

  registerForm: FormGroup;
  checkHttp: Observable<any>;

  @Output() myEvent = new EventEmitter();
  @Input() listSchtroumpf: Schtroumpf[];

  newSchtroumpfFriend: Schtroumpf;

  constructor(private request: RequestService, private formBuilder: FormBuilder)
  {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      age: ['', Validators.required],
      name: ['', Validators.required],
      family: ['', Validators.required],
      race: ['', [Validators.required]],
      food: ['', [Validators.required]],
    });
  }

  sendRequest()
  {
    const body = this.newSchtroumpfFriend;

    if (this.newSchtroumpfFriend == null)
    {
      console.log("character doesn't exist");
      return
    }
    let httpParams = this.request.transformBodyToHttpParam(body);

    this.checkHttp = this.request.post('friendschtroumpf/' + sessionStorage.getItem('id'), httpParams.toString());
    this.checkHttp.subscribe(data => {
      if (data) {
        this.myEvent.emit(null);
      }
    }, err => {
      console.log(err)
    });
  }

  selectSchtroumpf(elem)
  {
    this.newSchtroumpfFriend = this.listSchtroumpf.find(element => element.name == elem.target.value);
  }

}
