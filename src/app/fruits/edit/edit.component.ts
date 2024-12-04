import { Component, OnInit } from '@angular/core';
import { Fruits } from '../fruits';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Fruits_ById, GET_Fruits } from '../gql/fruits-query';
import { UPDATE_Fruits } from '../gql/fruits-mutation.ts';
import { filter } from 'rxjs';

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
  constructor(private apollo: Apollo, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: any) => {
      let id = Number(param.get('id'));
      console.log('id:', id);
      this.getById(id);
    })
  }

  getById(id: number) {
    this.apollo.watchQuery<{ allFruits: Fruits[] }>({
      query: Fruits_ById,
      variables: {
        fruitFilter: { id }
      }
    }).valueChanges.subscribe(({ data }) => {
      console.log('get data by id:', data);
      let fruitsById = data.allFruits[0];
      console.log('fruitsById:', fruitsById);

      this.fruitFrom = {
        id: fruitsById.id,
        name: fruitsById.name,
        quantity: fruitsById.quantity,
        price: fruitsById.price
      }
    })
  }

  update() {
    this.apollo.mutate<{ updateFruit: Fruits }>(
      {
        mutation: UPDATE_Fruits,
        variables: {
          id: this.fruitFrom.id,
          name: this.fruitFrom.name,
          quantity: this.fruitFrom.quantity,
          price: this.fruitFrom.price
        },
        // update: (store, { data }) => {
        //   if (data?.updateFruit) {
        //     var allData = store.readQuery<{ allFruits: Fruits[] }>({ query: GET_Fruits });

        //     if (allData && allData.allFruits.length > 0) {
        //       var newData: Fruits[] = [...allData.allFruits];
        //       newData = newData.filter(_ => _.id !== data.updateFruit.id)
        //       newData.push(data.updateFruit);

        //       store.writeQuery<{ allFruits: Fruits[] }>({
        //         query: GET_Fruits,
        //         data: { allFruits: newData }
        //       })
        //     }
        //   }
        // }
      }
    ).subscribe((data => {
      console.log('create res:', data);
      this.router.navigate(["/"]);

    }))
  }

}
