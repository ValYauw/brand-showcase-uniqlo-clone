const typeDefs = `#graphql

  type Category {
    id: ID!
    name: String!
  }

  type Image {
    id: ID
    productId: Int
    imgUrl: String!
  }
  
  type Product {
    id: ID
    name: String!
    slug: String!
    description: String!
    price: Int!
    mainImg: String!
    authorId: String
    categoryId: Int
    author: User
    category: Category
    images: [Image]
  }

  type ProductsPage {
    count: Int!
    page: Int!
    data: [Product!]!
  }
  
  type User {
    _id: ID!
    username: String!
    email: String!
    role: String!
    phoneNumber: String!
    address: String!
  }

  type Response {
    access_token: String
    message: String
  }

  input LoginDetails {
    email: String
    password: String
  }

  input RegistrationDetails {
    username: String
    email: String
    password: String
    phoneNumber: String
    address: String
  }

  input NewCategory {
    id: ID
    name: String!
  }

  input inputImg {
    id: ID
    productId: Int
    imgUrl: String!
  }

  input NewProduct {
    id: ID
    name: String!
    description: String!
    price: Int!
    mainImg: String!
    authorId: String
    categoryId: Int
    images: [inputImg!]!
  }

  type Query {
    categories: [Category!]!
    products(p: Int! = 1): ProductsPage!
    product(id: Int, slug: String): Product
    searchProducts(p: Int! = 1, search: String!): ProductsPage!
    users: [User]
    user(id: String, email: String): User
  }

  type Mutation {
    login(LoginDetails: LoginDetails): Response
    registerUser(RegistrationDetails: RegistrationDetails): Response
    registerStaff(RegistrationDetails: RegistrationDetails): Response
    deleteUser(id: String): Response
    addCategory(NewCategory: NewCategory): Category
    updateCategory(NewCategory: NewCategory): Category
    addProduct(NewProduct: NewProduct): Product
    updateProduct(NewProduct: NewProduct): Product
    deleteProduct(id: Int): Response
  }
  
`;

module.exports = typeDefs;