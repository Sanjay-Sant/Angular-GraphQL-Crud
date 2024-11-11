import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable, of } from 'rxjs';
import { Fruits } from '../fruits';
import { GET_Fruits } from '../gql/fruits-query';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allFruits$: Observable<Fruits[]> = of([]);

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.allFruits$ = this.apollo
      .watchQuery<{ allFruits: Fruits[] }>({ query: GET_Fruits })
      .valueChanges.pipe(map((res) => res.data.allFruits))
    console.log('allFruits$:', this.allFruits$);;


  }

}
