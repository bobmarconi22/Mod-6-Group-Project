# Mod-6-Group-Project

## Database Schema Design

![db-schema]

[db-schema]: ../../Screenshot%202024-05-15%20at%203.51.15 PM.png

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/session
  * Body: none

* Successful Response when there is a logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "first_name": "John",
        "last_name": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Successful Response when there is no logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": null
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/session
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "first_name": "John",
        "last_name": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", //
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "first_name": "John",
      "last_name": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "first_name": "John",
        "last_name": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "first_name": "First Name is required",
        "last_name": "Last Name is required"
      }
    }
    ```

## SHOPS

### Get all Shops

Returns all the shops.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/shops
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Shops": [
        {
          "id": 1,
          "owner_id": 1,
          "name": "App Academy",
          "description": "Place where web developers are created",
          "hours": { "Monday": "1:00-16:00" ,
                     "Tuesday": "1:00-16:00" ,
                     "Wednesday": "1:00-16:00" ,
                     "Thursday": "1:00-16:00" ,
                     "Friday": "1:00-16:00" ,
                     "Saturday": "2:00-7:00",
                     "Sunday": "2:00-7:00"},
          "website": "www.coffee.com",
          "phone_number": "123-456-7890",
          "price_range": 1,
          "created_at": "2021-11-19 20:39:36",
          "updated_at": "2021-11-19 20:39:36",
          "preview_image": "img.png",
          "avg_rating": 4.5,
          "categories": ["American", "To-Go", "Outdoor Seating"]
        }
      ]
    }
    ```

### Get all shops owned by the Current User

Returns all the shops owned (created) by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/shops/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Shops": [
        {
          "id": 1,
          "owner_id": 1,
          "name": "App Academy",
          "description": "Place where web developers are created",
          "hours": { "Monday": "1:00-16:00" ,
                     "Tuesday": "1:00-16:00" ,
                     "Wednesday": "1:00-16:00" ,
                     "Thursday": "1:00-16:00" ,
                     "Friday": "1:00-16:00" ,
                     "Saturday": "2:00-7:00",
                     "Sunday": "2:00-7:00"},
          "website": "www.coffee.com",
          "phone_number": "123-456-7890",
          "price_range": 1,
          "created_at": "2021-11-19 20:39:36",
          "updated_at": "2021-11-19 20:39:36",
          "preview_image": "img.png",
          "avg_rating": 4.5,
          "categories": ["American", "To-Go", "Outdoor Seating"]
        }
      ]
    }
    ```

### Get details of a shop from an id

Returns the details of a shop specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/shops/:shop_id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Shops": [
        {
          "id": 1,
          "owner_id": 1,
          "name": "App Academy",
          "description": "Place where web developers are created",
          "hours": { "Monday": "1:00-16:00" ,
                     "Tuesday": "1:00-16:00" ,
                     "Wednesday": "1:00-16:00" ,
                     "Thursday": "1:00-16:00" ,
                     "Friday": "1:00-16:00" ,
                     "Saturday": "2:00-7:00",
                     "Sunday": "2:00-7:00"},
          "website": "www.coffee.com",
          "phone_number": "123-456-7890",
          "price_range": 1,
          "created_at": "2021-11-19 20:39:36",
          "updated_at": "2021-11-19 20:39:36",
          "preview_image": "img.png",
          "avg_rating": 4.5,
          "categories": ["American", "To-Go", "Outdoor Seating"],
          "Addresses": {
            "id": 1,
            "shop_id": 1,
            "address_line1": "123 Coffee Way",
            "city": "Espresso",
            "state": "CF",
            "postal_code": "12345",
            "country": "US"
          },
          "Reviews":[
            {
            "User":{
                "id":1,
                "first_name": "Bob",
                "last_name": "Marconi",
                "city": "Espresso",
                "state": "CF",
                "num_reviews": 16,
                "num_images": 30
            },
            "review": "I love this place I go here all the time!",
            "rating": 5,
            "created_at": "2021-11-19 20:39:36",
            "updated_at": "2021-11-19 20:39:36"
            },
          ],
          "Images": [
             {
                "id": 1,
                "userId": 1,
                "shop_id": 1,
                "reviewId": 1,
                "img_link": "img.png",
                "preview_image": true,
                "created_at": "2021-11-19 20:39:36",
                "updated_at": "2021-11-19 20:39:36"
             },
          ]
        }
      ]
    }
    ```

* Error response: Couldn't find a shop with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "shop couldn't be found"
    }
    ```

### Create a shop

Creates and returns a new shop.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/shops
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
          "name": "App Academy",
          "description": "Place where web developers are created",
          "hours": { "Monday": "1:00-16:00" ,
                     "Tuesday": "1:00-16:00" ,
                     "Wednesday": "1:00-16:00" ,
                     "Thursday": "1:00-16:00" ,
                     "Friday": "1:00-16:00" ,
                     "Saturday": "2:00-7:00",
                     "Sunday": "2:00-7:00"},
          "website": "www.coffee.com",
          "phone_number": "123-456-7890",
          "price_range": 1,
          "categories": ["American", "To-Go", "Outdoor Seating"],
          "Addresses": {
            "id": 1,
            "shop_id": 1,
            "address_line1": "123 Coffee Way",
            "city": "Espresso",
            "state": "CF",
            "postal_code": "12345",
            "country": "US"
          },
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Shops": [
        {
          "id": 1,
          "owner_id": 1,
          "name": "App Academy",
          "description": "Place where web developers are created",
          "hours": { "Monday": "1:00-16:00" ,
                     "Tuesday": "1:00-16:00" ,
                     "Wednesday": "1:00-16:00" ,
                     "Thursday": "1:00-16:00" ,
                     "Friday": "1:00-16:00" ,
                     "Saturday": "2:00-7:00",
                     "Sunday": "2:00-7:00"},
          "website": "www.coffee.com",
          "phone_number": "123-456-7890",
          "price_range": 1,
          "created_at": "2021-11-19 20:39:36",
          "updated_at": "2021-11-19 20:39:36",
          "preview_image": "img.png",
          "avg_rating": 4.5,
          "categories": ["American", "To-Go", "Outdoor Seating"],
          "Addresses": {
            "id": 1,
            "shop_id": 1,
            "address_line1": "123 Coffee Way",
            "city": "Espresso",
            "state": "CF",
            "postal_code": "12345",
            "country": "US"
          },
          "Reviews":[
            {
            "User":{
                "id":1,
                "first_name": "Bob",
                "last_name": "Marconi",
                "city": "Espresso",
                "state": "CF",
                "num_reviews": 16,
                "num_images": 30
            },
            "review": "I love this place I go here all the time!",
            "rating": 5,
            "created_at": "2021-11-19 20:39:36",
            "updated_at": "2021-11-19 20:39:36"
            },
          ],
          "Images": [
             {
                "id": 1,
                "userId": 1,
                "shop_id": 1,
                "reviewId": 1,
                "img_link": "img.png",
                "preview_image": true,
                "created_at": "2021-11-19 20:39:36",
                "updated_at": "2021-11-19 20:39:36"
             },
          ]
        }
      ]
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "hours": "Hours of operation is required",
        "categories": "Please list at least one category",
        "website": "Invalid website input",
        "phone_number": "Please input a valid phone number",
        "price_range": "Please provide a valid price range from 1 to 5",
        "Address": "Please enter a valid Address"
      }
    }
    ```


### Add an Image to a shop based on the shop's id

Create and return a new image for a shop specified by id.

- Require Authentication: true
- Require proper authorization: shop must belong to the current user
- Request

  - Method: POST
  - URL: api/shops/:id/images
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "url": "image url",
      "preview_image": true
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "url": "image url",
      "preview_image": true
    }
    ```

- Error response: Couldn't find a shop with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "shop couldn't be found"
    }
    ```

### Edit a shop

Updates and returns an existing shop.

* Require Authentication: true
* Require proper authorization: shop must belong to the current user
* Request
  * Method: PUT
  * URL: /api/shops/:shop_id
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
     {
          "name": "App Academy",
          "description": "Place where web developers are created",
          "hours": { "Monday": "1:00-16:00" ,
                     "Tuesday": "1:00-16:00" ,
                     "Wednesday": "1:00-16:00" ,
                     "Thursday": "1:00-16:00" ,
                     "Friday": "1:00-16:00" ,
                     "Saturday": "2:00-7:00",
                     "Sunday": "2:00-7:00"},
          "website": "www.coffee.com",
          "phone_number": "123-456-7890",
          "price_range": 1,
          "categories": ["American", "To-Go", "Outdoor Seating"],
          "Addresses": {
            "id": 1,
            "shop_id": 1,
            "address_line1": "123 Coffee Way",
            "city": "Espresso",
            "state": "CF",
            "postal_code": "12345",
            "country": "US"
          },
    }
    ```



* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
          "id": 1,
          "owner_id": 1,
          "name": "App Academy",
          "description": "Place where web developers are created",
          "hours": { "Monday": "1:00-16:00" ,
                     "Tuesday": "1:00-16:00" ,
                     "Wednesday": "1:00-16:00" ,
                     "Thursday": "1:00-16:00" ,
                     "Friday": "1:00-16:00" ,
                     "Saturday": "2:00-7:00",
                     "Sunday": "2:00-7:00"},
          "website": "www.coffee.com",
          "phone_number": "123-456-7890",
          "price_range": 1,
          "created_at": "2021-11-19 20:39:36",
          "updated_at": "2021-11-19 20:39:36",
          "categories": ["American", "To-Go", "Outdoor Seating"],
          "Addresses": {
            "id": 1,
            "shop_id": 1,
            "address_line1": "123 Coffee Way",
            "city": "Espresso",
            "state": "CF",
            "postal_code": "12345",
            "country": "US"
          },
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "hours": "Hours of operation is required",
        "categories": "Please list at least one category",
        "website": "Invalid website input",
        "phone_number": "Please input a valid phone number",
        "price_range": "Please provide a valid price range from 1 to 5",
        "Address": "Please enter a valid Address"
      }
    }
    ```

* Error response: Couldn't find a shop with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "shop couldn't be found"
    }
    ```

### Delete a shop

Deletes an existing shop.

* Require Authentication: true
* Require proper authorization: shop must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/shops/:shop_id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a shop with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Shop couldn't be found"
    }
    ```

## REVIEWS

### Get all Reviews of the Current User

Returns all the reviews written by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/reviews/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Reviews": [
        {
          "id": 1,
          "userId": 1,
          "shop_id": 1,
          "review": "This was an awesome shop!",
          "rating": 5,
          "created_at": "2021-11-19 20:39:36",
          "updated_at": "2021-11-19 20:39:36" ,
          "shop": {
                 "id": 1,
                "owner_id": 1,
                "name": "App Academy",
                "price_range": 1,
                "categories": ["American", "To-Go", "Outdoor Seating"],
                "Addresses": {
                    "id": 1,
                    "shop_id": 1,
                    "address_line1": "123 Coffee Way",
                    "city": "Espresso",
                    "state": "CF",
                    "postal_code": "12345",
                    "country": "US"
                },
          },
          "ReviewImages": [
            {
              "id": 1,
              "img_link": "image url"
            }
          ]
        }
      ]
    }
    ```

### Get all Reviews by a shop's id

Returns all the reviews that belong to a shop specified by id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/shops/:shop_id/reviews
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "Reviews": [
            {
            "id": 1,
            "userId": 1,
            "shop_id": 1,
            "review": "This was an awesome shop!",
            "rating": 5,
            "created_at": "2021-11-19 20:39:36",
            "updated_at": "2021-11-19 20:39:36",
             "User":{
                "id":1,
                "first_name": "Bob",
                "last_name": "Marconi",
                "city": "Espresso",
                "state": "CF",
                "num_reviews": 16,
                "num_images": 30
            },
            "ReviewImages": [
                {
                "id": 1,
                "img_link": "image url"
                }
            ]
        }
        ]
    }
    ```

* Error response: Couldn't find a shop with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "shop couldn't be found"
    }
    ```

### Create a Review for a shop based on the shop's id

Create and return a new review for a shop specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/shops/:shop_id/reviews
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review": "This was an awesome shop!",
      "rating": 5,
      "Images": [
         {
        "url": "image url",
        "preview_image": "False"
        },
        {
        "url": "image url",
        "preview_image": "False"
        }
      ]
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "shop_id": 1,
      "review": "This was an awesome shop!",
      "rating": 5,
      "created_at": "2021-11-19 20:39:36",
      "updated_at": "2021-11-19 20:39:36",
      "Images": [
         {
        "id": 9,
        "url": "image url",
        "preview_image": "False"
        },
        {
        "id": 10,
        "url": "image url",
        "preview_image": "False"
        }
      ]
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "review": "Review text is required",
        "rating": "rating is required",
      }
    }
    ```

* Error response: Couldn't find a shop with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "shop couldn't be found"
    }
    ```

* Error response: Review from the current user already exists for the shop
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already has a review for this shop"
    }
    ```


### Edit a Review

Update and return an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: PUT
  * URL: /api/reviews/:reviewId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review": "This was an awesome shop!",
      "rating": 5,
      "Images": [
         {
        "url": "image url",
        "preview_image": "False"
        },
        {
        "url": "image url",
        "preview_image": "False"
        }
      ]
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "shop_id": 1,
      "review": "This was an awesome shop!",
      "rating": 5,
      "created_at": "2021-11-19 20:39:36",
      "updated_at": "2021-11-20 10:06:40",
       "Images": [
         {
        "id": 9,
        "url": "image url",
        "preview_image": "False"
        },
        {
        "id": 10,
        "url": "image url",
        "preview_image": "False"
        }
      ]
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "review": "Review text is required",
        "rating": "rating must be an integer from 1 to 5",
      }
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```

### Delete a Review

Delete an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/reviews/:reviewId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```


## IMAGES

### Delete a shop Image

Delete an existing image for a shop or a review

* Require Authentication: true
* Require proper authorization: image must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/images/:imageId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a shop Image with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "shop Image couldn't be found"
    }
    ```

## Add Query Filters to Get All shops <--NEED TO WORK ON THIS

Return shops filtered by query parameters.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/shops
  * Query Parameters
    * page: integer, minimum: 1, maximum: 10, default: 1
    * size: integer, minimum: 1, maximum: 20, default: 20
    * minPrice: decimal, optional, minimum: 1, maximum: 5, default: none
    * maxPrice: decimal, optional, minimum: 1, maximum: 5, default: none
    * categories: select, optional, default: none
    * name: string, optional, default: none
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "shops": [
        {
          "id": 1,
          "owner_id": 1,
          "name": "App Academy",
          "description": "Place where web developers are created",
          "hours": { "Monday": "1:00-16:00" ,
                     "Tuesday": "1:00-16:00" ,
                     "Wednesday": "1:00-16:00" ,
                     "Thursday": "1:00-16:00" ,
                     "Friday": "1:00-16:00" ,
                     "Saturday": "2:00-7:00",
                     "Sunday": "2:00-7:00"},
          "website": "www.coffee.com",
          "phone_number": "123-456-7890",
          "price_range": 1,
          "created_at": "2021-11-19 20:39:36",
          "updated_at": "2021-11-19 20:39:36",
          "preview_image": "img.png",
          "avg_rating": 4.5,
          "categories": ["American", "To-Go", "Outdoor Seating"]
        }
      ],
      "page": 1,
      "size": 20
    }
    ```

* Error Response: Query parameter validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "page": "Page must be greater than or equal to 1",
        "size": "Size must be greater than or equal to 1",
        "minPrice": "Minimum price must be between 1 and 5",
        "maxPrice": "Maximum price must be between 1 and 5 and greater than min price",
      }
    }
    ```
