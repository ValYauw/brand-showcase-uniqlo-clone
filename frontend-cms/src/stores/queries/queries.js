export const GQL_LOGIN = ({ email, password }) => ({
  operationName: 'Login',
  query: `
    mutation Login($loginDetails: LoginDetails) {
      login(LoginDetails: $loginDetails) {
        access_token
      }
    }
  `,
  variables: {
    loginDetails: {
      email: email,
      password: password
    }
  }
})

export const GQL_REGISTER = ({ username, email, password, phoneNumber, address }) => ({
  operationName: 'RegisterStaff',
  query: `
    mutation RegisterStaff($registrationDetails: RegistrationDetails) {
      registerStaff(RegistrationDetails: $registrationDetails) {
        message
      }
    }
  `,
  variables: {
    registrationDetails: {
      username: username,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      address: address
    }
  }
})

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

export const GQL_GET_PRODUCTS = () => ({
  operationName: 'Query',
  query: `
    query Query {
      cmsProducts {
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
  `,
  variables: {}
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

export const GQL_GET_PRODUCT = (id) => ({
  operationName: 'Query',
  query: `
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
  `,
  variables: {
    id: +id
  }
})

export const GQL_ADD_PRODUCT = ({name, description, price, mainImg, categoryId, images}) => ({
  operationName: 'Mutation',
  query: `
    mutation Mutation($newProduct: NewProduct) {
      addProduct(NewProduct: $newProduct) {
        id
      }
    }
  `,
  variables: {
    newProduct: {
      name: name,
      description: description,
      price: price ? +price : null,
      mainImg: mainImg,
      categoryId: categoryId ? +categoryId : null,
      images: images
    }
  }
})

export const GQL_EDIT_PRODUCT = ({id, name, description, price, mainImg, categoryId, images}) => ({
  operationName: 'Mutation',
  query: `
    mutation Mutation($newProduct: NewProduct) {
      updateProduct(NewProduct: $newProduct) {
        id
      }
    }
  `,
  variables: {
    newProduct: {
      id: +id,
      name: name,
      description: description,
      price: price ? +price : null,
      mainImg: mainImg,
      categoryId: categoryId ? +categoryId : null,
      images: images
    }
  }
})

export const GQL_DELETE_PRODUCT = (id) => ({
  operationName: 'Mutation',
  query: `
    mutation Mutation($id: Int!) {
      deleteProduct(id: $id) {
        message
      }
    }
  `,
  variables: {
    id: +id
  }
})