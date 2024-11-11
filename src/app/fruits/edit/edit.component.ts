import { Component, OnInit } from '@angular/core';
import { Fruits } from '../fruits';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  fruitFrom: Fruits = {
    id: 0,
    name: '',
    quantity: 0,
    price: 0
  }
  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {

  }

  update() {

  }

}
