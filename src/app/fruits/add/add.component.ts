import { Component, OnInit } from '@angular/core';
import { Fruits } from '../fruits';
import { Apollo } from 'apollo-angular';
import { CREATE_Fruits } from '../gql/fruits-mutation.ts';
import { Router } from '@angular/router';
import { GET_Fruits } from '../gql/fruits-query';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  fruitFrom: Fruits = {
    id: 0,
    name: '',
    quantity: 0,
    price: 0
  }

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void { }

  create() {
    this.apollo.mutate<{ createFruit: Fruits }>(
      {
        mutation: CREATE_Fruits,
        variables: {
          name: this.fruitFrom.name,
          quantity: this.fruitFrom.quantity,
          price: this.fruitFrom.price
        },
        update: (store, { data }) => {
          if (data?.createFruit) {
            var allData = store.readQuery<{ allFruits: Fruits[] }>({ query: GET_Fruits });

            if (allData && allData.allFruits.length > 0) {
              var newData: Fruits[] = [...allData.allFruits];
              newData.unshift(data.createFruit);

              store.writeQuery<{ allFruits: Fruits[] }>({
                query: GET_Fruits,
                data: { allFruits: newData }
              })
            }
          }
        }
      }
    ).subscribe((data => {
      console.log('create res:', data);
      this.router.navigate(["/"]);

    }));
  }

}
