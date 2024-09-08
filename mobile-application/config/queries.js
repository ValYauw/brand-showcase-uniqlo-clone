import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query Query {
    categories {
      id
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
  query Query($page: Int!) {
    products(p: $page) {
      count
      page
      data {
        id
        name
        slug
        description
        price
        mainImg
        category {
          name
        }
      }
    }
  }
`;

export const SEARCH_PRODUCTS = gql`
  query Query($page: Int!, $search: String!) {
    searchProducts(p: $page, search: $search) {
      count
      page
      data {
        id
        name
        slug
        description
        price
        mainImg
        category {
          name
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query Query($id: Int!) {
    product(id: $id) {
      id
      name
      description
      price
      mainImg
      category {
        id
        name
      }
      images {
        id
        imgUrl
        productId
      }
    }
  }
`;