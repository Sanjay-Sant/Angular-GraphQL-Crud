import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable, of } from 'rxjs';
import { Fruits } from '../fruits';
import { GET_Fruits } from '../gql/fruits-query';
import { DELETE_Fruit } from '../gql/fruits-mutation.ts';
declare let window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allFruits$: Observable<Fruits[]> = of([]);

  deleteModal: any;
  idToDelete: number = 0;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    )

    this.allFruits$ = this.apollo
      .watchQuery<{ allFruits: Fruits[] }>({ query: GET_Fruits }) // query: GET_Fruits, fetchPolicy: 'no-cache'
      .valueChanges.pipe(map((res) => res.data.allFruits))
    console.log('allFruits$:', this.allFruits$);
  }

  openConfirmationModal(id: number) {
    this.idToDelete = id;
    this.deleteModal.show();
  }

  delete() {
    this.apollo.mutate<{ removeFruit: Fruits }>(
      {
        mutation: DELETE_Fruit,
        variables: {
          id: this.idToDelete
        },
        update: (store, { data }) => {
          if (data?.removeFruit) {
            let allData = store.readQuery<{ allFruits: Fruits[] }>({ query: GET_Fruits });

            if (allData && allData.allFruits.length > 0) {
              let newData: Fruits[] = [...allData.allFruits];
              newData = newData.filter(_ => _.id !== data.removeFruit.id)

              store.writeQuery<{ allFruits: Fruits[] }>({
                query: GET_Fruits,
                data: { allFruits: newData }
              })
            }
          }
        }
      }
    ).subscribe((data => {
      console.log('delete res:', data);
      this.deleteModal.hide();
    }));
  }

}
