# API Documentation

## List of Entrypoints

<table>

<thead>
<tr>
<td>HTTP Method</td>
<td>Entrypoint</td>
<td>Description</td>
</tr>
</thead>

<tbody>

<tr>
<td colspan=3><center><b>PUBLIC ENTRYPOINTS</b></center></td>
</tr>

<tr>
<td>GET</td>
<td><code>/categories</code></td>
<td>Fetch list of categories.</td>
</tr>

<tr>
<td>GET</td>
<td><code>/products</code></td>
<td>Fetch a list of products for customers, with pagination.</td>
</tr>

<tr>
<td>GET</td>
<td><code>/products/:id</code></td>
<td>Get product with specific Id.</td>
</tr>

<tr>
<td>GET</td>
<td><code>/slug/:slug</code></td>
<td>Search for product with the specified slug and returns the found product.</td>
</tr>

<tr>
<td>POST</td>
<td><code>/categories</code></td>
<td>Add a new category.</td>
</tr>

<tr>
<td>PUT</td>
<td><code>/categories/:id</code></td>
<td>Update details of an existing category.</td>
</tr>

<tr>
<td>POST</td>
<td><code>/products</code></td>
<td>Add a new product.</td>
</tr>

<tr>
<td>PUT</td>
<td><code>/products/:id</code></td>
<td>Update details of an existing product.</td>
</tr>

<tr>
<td>DELETE</td>
<td><code>/products/:id</code></td>
<td>Delete an existing product.</td>
</tr>

</tbody>

</table>

## GET /categories

Fetch list of all categories.

### Response

200 - OK

```json
[
    {
        "id": 1,
        "name": "T-shirt"
    },
    {
        "id": 2,
        "name": "Skirt & Blouse"
    },
    {
        "id": 3,
        "name": "Jeans"
    },
    {
        "id": 4,
        "name": "Men's Formal Shirts"
    }
]
```

## GET /products

Fetch a list of products for customers, per page. Each page contains six product items. 

### Request

Query
 - <code>p</code>: Page number for retrieved products. Default 1. 

### Response

200 - OK

```json
{
    "count": 16,
    "page": 1,
    "data": [
        {
            "id": 1,
            "name": "Crew Neck Short Sleeve T-Shirt Uniqlo U",
            "slug": "crew-neck-short-sleeve-t-shirt-uniqlo-u-lmbtpmjq",
            "description": "Heavyweight fabric gains character the more you wear it. Flattering roomy fit.",
            "price": 199000,
            "mainImg": "https://dummyimage.com/600x400/000/fff",
            "category": {
                "id": 1,
                "name": "T-shirt"
            }
        },
        ...
    ]
}
```

## GET /product/:id

Get product with specific Id.

### Request

Params
 - <code>id</code>: Product Id

### Response

200 - OK

```json
{
    "id": 1,
    "name": "Crew Neck Short Sleeve T-Shirt Uniqlo U",
    "slug": "crew-neck-short-sleeve-t-shirt-uniqlo-u-lmbtpmjq",
    "description": "Heavyweight fabric gains character the more you wear it. Flattering roomy fit.",
    "price": 199000,
    "mainImg": "https://dummyimage.com/600x400/000/fff",
    "authorId": "1",
    "category": {
        "id": 1,
        "name": "T-shirt"
    },
    "images": [
        {
            "id": 1,
            "productId": 1,
            "imgUrl": "https://dummyimage.com/600x400/000/fff"
        },
        {
            "id": 2,
            "productId": 1,
            "imgUrl": "https://dummyimage.com/600x400/000/fff"
        },
        {
            "id": 3,
            "productId": 1,
            "imgUrl": "https://dummyimage.com/600x400/000/fff"
        }
    ]
}
```

404 - Not Found

```json
{
    "statusCode": 404,
    "message": "Data not found"
}
```

## GET /slug/:slug

Search for product with the specified slug and returns the found product.

### Request

Params
 - <code>slug</code>: URL slug of product

### Response 

200 - OK

```json
{
    "id": 1,
    "name": "Crew Neck Short Sleeve T-Shirt Uniqlo U",
    "slug": "crew-neck-short-sleeve-t-shirt-uniqlo-u-lmbtpmjq",
    "description": "Heavyweight fabric gains character the more you wear it. Flattering roomy fit.",
    "price": 199000,
    "mainImg": "https://dummyimage.com/600x400/000/fff",
    "authorId": "1",
    "category": {
        "id": 1,
        "name": "T-shirt"
    },
    "images": [
        {
            "id": 1,
            "productId": 1,
            "imgUrl": "https://dummyimage.com/600x400/000/fff"
        },
        {
            "id": 2,
            "productId": 1,
            "imgUrl": "https://dummyimage.com/600x400/000/fff"
        },
        {
            "id": 3,
            "productId": 1,
            "imgUrl": "https://dummyimage.com/600x400/000/fff"
        }
    ]
}
```

404 - Not Found

```json
{
    "statusCode": 404,
    "message": "Data not found"
}
```

## POST /categories

Add a new category.

### Request

Body 
```json
{
    "name": "Unisex"
}
```

### Response

Body
```json
{
    "id": 4,
    "name": "Unisex",
    "updatedAt": "2023-09-14T12:21:32.678Z",
    "createdAt": "2023-09-14T12:21:32.678Z"
}
```

## PUT /categories/:id

Edit an existing category.

### Request

Params
 - `id`: Category id.

Body 
```json
{
    "id": 4,
    "name": "T-shirt"
}
```

### Response

Body
```json
{
    "id": 4,
    "name": "T-shirt",
    "createdAt": "2023-09-14T12:21:32.678Z",
    "updatedAt": "2023-09-14T12:24:55.553Z"
}
```

## POST /products

Add a new product.

### Request

Body
```json
{
    "name": "New product", 
    "description": "lorem ipsum dolor sit amet", 
    "price": 30000, 
    "mainImg": "https://dummyimage.com/000000/250/ffffff", 
    "categoryId": 3,
    "images": [
        { "imgUrl": "https://dummyimage.com/ffffff/250/000000" },
        { "imgUrl": "https://dummyimage.com/ffffff/250/000000" }
    ]
}
```

### Response

200 - OK
```json
{
    "id": 38,
    "name": "New product",
    "slug": "new-product-lmc0dabb",
    "description": "lorem ipsum dolor sit amet",
    "price": 30000,
    "mainImg": "https://dummyimage.com/000000/250/ffffff",
    "categoryId": 3,
    "createdAt": "2023-09-09T12:34:31.414Z",
    "updatedAt": "2023-09-09T12:34:31.414Z",
    "images": [
        {
            "id": 65,
            "productId": 38,
            "imgUrl": "https://dummyimage.com/ffffff/250/000000",
            "createdAt": "2023-09-09T12:34:31.427Z",
            "updatedAt": "2023-09-09T12:34:31.427Z"
        },
        {
            "id": 66,
            "productId": 38,
            "imgUrl": "https://dummyimage.com/ffffff/250/000000",
            "createdAt": "2023-09-09T12:34:31.427Z",
            "updatedAt": "2023-09-09T12:34:31.427Z"
        }
    ]
}
```

400 - Bad Request
```json
{
    "statusCode": 400,
    "message": "Validation Error",
    "errors": [
        "Product image is required",
        "Image Url is invalid"
    ]
}
```

## PUT /products/:id

Update details of an existing product.

### Request

Params
 - <code>id</code>: Product Id

Body
```json
{
    "id": 36,
    "name": "Updated Product Name", 
    "description": "Lorem ipsum dolor sit amet", 
    "price": 500000, 
    "mainImg": "https://dummyimage.com/ffffff/250/000000", 
    "categoryId": 1, 
    "images": [
        {
            "id": 43,
            "productId": 36,
            "imgUrl": "https://dummyimage.com/ffffff/250/000000"
        },
        {
            "imgUrl": "https://dummyimage.com/ffffff/250/000000"
        },
        {
            "imgUrl": "https://dummyimage.com/000000/250/ffffff"
        }
    ]
}
```

### Response 

200 - OK
```json
{
    "id": 36,
    "name": "Updated Product Name",
    "slug": "new-product-lmc09ehf",
    "description": "Lorem ipsum dolor sit amet",
    "price": 500000,
    "mainImg": "https://dummyimage.com/ffffff/250/000000",
    "categoryId": 1,
    "createdAt": "2023-09-09T12:31:30.194Z",
    "updatedAt": "2023-09-09T12:36:12.888Z",
    "images": [
        {
            "id": 43,
            "productId": 36,
            "imgUrl": "https://dummyimage.com/ffffff/250/000000",
            "createdAt": "2023-09-09T12:30:10.192Z",
            "updatedAt": "2023-09-09T12:36:12.893Z"
        },
        {
            "id": 67,
            "productId": 36,
            "imgUrl": "https://dummyimage.com/ffffff/250/000000",
            "createdAt": "2023-09-09T12:36:12.893Z",
            "updatedAt": "2023-09-09T12:36:12.893Z"
        },
        {
            "id": 68,
            "productId": 36,
            "imgUrl": "https://dummyimage.com/000000/250/ffffff",
            "createdAt": "2023-09-09T12:36:12.894Z",
            "updatedAt": "2023-09-09T12:36:12.894Z"
        }
    ]
}
```

400 - Bad Request
```json
{
    "statusCode": 400,
    "message": "Validation Error",
    "errors": [
        "Product image is required",
        "Image Url is invalid"
    ]
}
```

404 - Not Found
```json
{
    "statusCode": 404,
    "message": "Data not found"
}
```

## DELETE /products/:id

Delete an existing product.

### Request

Params
 - <code>id</code>: Product Id

### Response 

200 - OK
```json
{
    "message": "Successfully deleted product with id #19"
}
```

404 - Not Found
```json
{
    "statusCode": 404,
    "message": "Data not found"
}
```