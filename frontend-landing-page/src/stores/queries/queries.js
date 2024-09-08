export const GQL_GET_CATEGORIES = () => ({
  operationName: 'Query',
  query: `
    query Query {
      categories {
        id
        name
      }
    }
  `,
  variables: {}
})

export const GQL_GET_PRODUCTS = (page) => ({
  operationName: 'Query',
  query: `
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
  `,
  variables: {
    page: page
  }
})

export const GQL_SEARCH_PRODUCTS = (page, search) => ({
  operationName: 'Query',
  query: `
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
  `,
  variables: {
    page: page,
    search: search
  }
})

export const GQL_GET_PRODUCT = (slug) => ({
  operationName: 'Query',
  query: `
    query Query($slug: String!) {
      product(slug: $slug) {
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
  `,
  variables: {
    slug: slug
  }
})