import { gql } from "apollo-angular"

export const GET_Fruits = gql`query{
  allFruits {
    id
    name
    quantity
    price
  }
}`