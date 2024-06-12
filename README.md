# Mod-6-Group-Project
Mod 6 Group Project - Yelp Clone


## Endpoints
| Request | Purpose | Return Value |
| --- | --- | --- |
| GET /{{path}} | Serve content based on path | HTML content |
| GET /api/docs | Get API documentation | HTML documentation page |
| GET /api | Get API info | Hello I'm running! |
| GET /api/auth/logout | Log out user | {"message": "User logged out"} |
| GET /api/auth/ | Authenticate a user | |
| GET /api/auth/unauthorized | Return unauthorized message |{"errors":{"message": "Unauthorized"}} |
| GET /api/users/{{id}} | Fetch user by ID | User object |
| GET /api/users/ | Fetch all users | Array of user objects |
| GET /api/shops/ | Fetch all shops | Array of shop objects |
| GET /api/shops/{{id}} | Fetch shop by ID | Shop object |
| GET /api/shops/{{shopId}}/reviews | Fetch all reviews by shop | Array of review objects |
| GET /api/search/ | Search for shops | Array of shop objects |
| GET /api/categories/ | Fetch all categories | Array of category objects |
| GET / | Serve the root directory | HTML content |
| GET /api/reviews/current | Fetch reviews for current user | Array of review objects |
| GET /api/shops/current | Fetch shops for current user | Array of shop objects |

| POST /api/shops/{{shop_id}}/images | Upload image to shop | Success message |
| POST /api/auth/login | Log in user | {
    "id": 1,
    "first_name": "Demo",
    "last_name": "User",
    "username": "demo_u"
    "email": "demo@aa.io",
    "phone_number": "555-555-0001",
    "city": "New York",
    "state": "NY",
    "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
    "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
} |
| POST /api/shops/{{shop_id}}/reviews/new | Add new review to shop | Success message |
| POST /api/shops/new | Add new shop | Success message |
| POST /api/auth/signup | Sign up new user | {'id': INT, 'username': STRING, 'email': STRING} |
| PUT /api/reviews/{{review_id}} | Update review | Success message |
| PUT /api/shops/{{shop_id}}/update | Update shop | Success message |
| DELETE /api/shops/{{shop_id}}/images/{{image_id}} | Delete shop image | Success message |
| DELETE /api/reviews/{{reviewId}} | Delete review | Success message |
| DELETE /api/shops/{{shop_id}}/delete | Delete shop | {"message": "Successfully deleted"} |


<!-- | GET /api/auth/ | Authenticate a user | |
     {
    "id": 1,
    "first_name": "Demo",
    "last_name": "User",
    "username": "demo_u"
    "email": "demo@aa.io",
    "phone_number": "555-555-0001",
    "city": "New York",
    "state": "NY",
    "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
    "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
    } -->

<!-- | GET /api/users/{{id}} | Fetch user by ID | User object |
{
    "city": "New York",
    "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
    "email": "demo@aa.io",
    "first_name": "Demo",
    "id": 1,
    "last_name": "User",
    "phone_number": "555-555-0001",
    "state": "NY",
    "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
    "username": "demo_u"
} -->

<!-- | GET /api/users/ | Fetch all users | Array of user objects |

{
    "users": [
        {
            "city": "New York",
            "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "email": "demo@aa.io",
            "first_name": "Demo",
            "id": 1,
            "last_name": "User",
            "phone_number": "555-555-0001",
            "state": "NY",
            "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "username": "demo_u"
        }, -->

<!-- | GET /api/shops/ | Fetch all shops | Array of shop objects |
[
    {
        "address": {
            "address_line1": "123 Espresso Lane",
            "address_line2": null,
            "city": "Philadelphia",
            "country": "United States of America",
            "id": 1,
            "postal_code": "19107",
            "state": "PA"
        },
        "avg_rating": "4.50",
        "categories": [
            "Outdoor Seating",
            "Organic Coffee",
            "Dinner Menu"
        ],
        "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
        "description": "Exceptional coffee and freshly baked goods.",
        "hours": {
            "friday": "7:00am - 8:00pm",
            "monday": "7:00am - 8:00pm",
            "saturday": "8:00am - 6:00pm",
            "sunday": "8:00am - 6:00pm",
            "thursday": "7:00am - 8:00pm",
            "tuesday": "7:00am - 8:00pm",
            "wednesday": "7:00am - 8:00pm"
        },
        "id": 1,
        "name": "Roast and Toast",
        "num_reviews": 4,
        "owner_id": 1,
        "phone_number": "5557890123",
        "preview_image": {
            "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "id": 1,
            "img_link": "https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg",
            "preview_image": true,
            "review_id": null,
            "shop_id": 1,
            "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "user_id": 1
        },
        "price_range": 3,
        "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
        "website": "http://roastandtoast.com"
    }, -->

<!-- | GET /api/shops/{{id}} | Fetch shop by ID | Shop object |
{
    "address": {
        "address_line1": "123 Espresso Lane",
        "address_line2": null,
        "city": "Philadelphia",
        "country": "United States of America",
        "id": 1,
        "postal_code": "19107",
        "state": "PA"
    },
    "avg_rating": "4.50",
    "categories": [
        "Outdoor Seating",
        "Organic Coffee",
        "Dinner Menu"
    ],
    "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
    "description": "Exceptional coffee and freshly baked goods.",
    "hours": {
        "friday": "7:00am - 8:00pm",
        "monday": "7:00am - 8:00pm",
        "saturday": "8:00am - 6:00pm",
        "sunday": "8:00am - 6:00pm",
        "thursday": "7:00am - 8:00pm",
        "tuesday": "7:00am - 8:00pm",
        "wednesday": "7:00am - 8:00pm"
    },
    "id": 1,
    "image": [
        {
            "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "id": 2,
            "img_link": "https://media-cdn.tripadvisor.com/media/photo-s/14/69/bd/9e/shakshuka-12-at-cafe.jpg",
            "preview_image": false,
            "review_id": null,
            "shop_id": 1,
            "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "user_id": 1
        },
        {
            "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "id": 3,
            "img_link": "https://media.timeout.com/images/105179583/image.jpg",
            "preview_image": false,
            "review_id": null,
            "shop_id": 1,
            "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "user_id": 1
        },
        {
            "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "id": 4,
            "img_link": "https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134128/BrewReview%20Shop%20Images/SIGNAL-1_nmasfb.jpg",
            "preview_image": false,
            "review_id": null,
            "shop_id": 1,
            "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "user_id": 1
        },
        {
            "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "id": 1,
            "img_link": "https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg",
            "preview_image": true,
            "review_id": null,
            "shop_id": 1,
            "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "user_id": 1
        },
        {
            "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "id": 6,
            "img_link": "https://images.squarespace-cdn.com/content/v1/572e312db654f906290c6a68/1518029229926-IA875XL3TC5UAHTENJW3/unnamed-7.jpg",
            "preview_image": false,
            "review_id": 2,
            "shop_id": 1,
            "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "user_id": 2
        },
        {
            "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "id": 7,
            "img_link": "https://s3-media0.fl.yelpcdn.com/bphoto/X5tKF5x7aF3dH9o8o9_udA/348s.jpg",
            "preview_image": false,
            "review_id": 3,
            "shop_id": 1,
            "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "user_id": 3
        },
        {
            "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "id": 5,
            "img_link": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwVoF49SZ-Hu3hAQywEIkoJWQz1nK4lQ-CXBYbctbP-g&s",
            "preview_image": false,
            "review_id": 1,
            "shop_id": 1,
            "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "user_id": 10
        },
        {
            "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "id": 8,
            "img_link": "https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134128/BrewReview%20Shop%20Images/SIGNAL-3_mg0ff0.jpg",
            "preview_image": false,
            "review_id": 4,
            "shop_id": 1,
            "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "user_id": 15
        }
    ],
    "menu": [
        {
            "id": 6,
            "name": "Americano",
            "popular_item": false,
            "price": "4.0000000000",
            "shop_id": 1
        },
        {
            "id": 10,
            "name": "Blonde Roast",
            "popular_item": false,
            "price": "3.0000000000",
            "shop_id": 1
        },
        {
            "id": 15,
            "name": "Café Misto",
            "popular_item": false,
            "price": "4.0000000000",
            "shop_id": 1
        },
        {
            "id": 12,
            "name": "Caramel Latte",
            "popular_item": false,
            "price": "5.5000000000",
            "shop_id": 1
        },
        {
            "id": 14,
            "name": "Chai Tea Latte",
            "popular_item": false,
            "price": "5.0000000000",
            "shop_id": 1
        },
        {
            "id": 1,
            "name": "Cold Brew",
            "popular_item": true,
            "price": "5.0000000000",
            "shop_id": 1
        },
        {
            "id": 13,
            "name": "Dark Roast",
            "popular_item": false,
            "price": "3.0000000000",
            "shop_id": 1
        },
        {
            "id": 2,
            "name": "Espresso",
            "popular_item": true,
            "price": "3.0000000000",
            "shop_id": 1
        },
        {
            "id": 5,
            "name": "Flat White",
            "popular_item": true,
            "price": "5.0000000000",
            "shop_id": 1
        },
        {
            "id": 8,
            "name": "Hot Chocolate",
            "popular_item": false,
            "price": "3.5000000000",
            "shop_id": 1
        },
        {
            "id": 7,
            "name": "Iced Americano",
            "popular_item": false,
            "price": "4.0000000000",
            "shop_id": 1
        },
        {
            "id": 4,
            "name": "Iced Coffee",
            "popular_item": true,
            "price": "4.0000000000",
            "shop_id": 1
        },
        {
            "id": 11,
            "name": "Mocha Frappuccino",
            "popular_item": false,
            "price": "5.5000000000",
            "shop_id": 1
        },
        {
            "id": 3,
            "name": "Pumpkin Spice Latte",
            "popular_item": true,
            "price": "5.5000000000",
            "shop_id": 1
        },
        {
            "id": 9,
            "name": "Vanilla Bean Frappuccino",
            "popular_item": false,
            "price": "5.5000000000",
            "shop_id": 1
        }
    ],
    "name": "Roast and Toast",
    "num_reviews": 4,
    "owner_id": 1,
    "phone_number": "5557890123",
    "price_range": 3,
    "review": [
        {
            "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "id": 2,
            "rating": 5,
            "review": "The baked goods are amazing. Love this place!",
            "reviewer": {
                "city": "Los Angeles",
                "first_name": "Marnie",
                "state": "CA"
            },
            "shop": {
                "id": 1,
                "name": "Roast and Toast"
            },
            "shop_id": 1,
            "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "user_id": 2
        },
        {
            "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "id": 3,
            "rating": 4,
            "review": "Perfect spot for a morning coffee.",
            "reviewer": {
                "city": "Chicago",
                "first_name": "Bobbie",
                "state": "IL"
            },
            "shop": {
                "id": 1,
                "name": "Roast and Toast"
            },
            "shop_id": 1,
            "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "user_id": 3
        },
        {
            "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "id": 1,
            "rating": 5,
            "review": "Great atmosphere and delicious coffee!",
            "reviewer": {
                "city": "San Jose",
                "first_name": "Laura",
                "state": "CA"
            },
            "shop": {
                "id": 1,
                "name": "Roast and Toast"
            },
            "shop_id": 1,
            "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "user_id": 10
        },
        {
            "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "id": 4,
            "rating": 4,
            "review": "Nice place to read a book while sipping coffee.",
            "reviewer": {
                "city": "Charlotte",
                "first_name": "Charles",
                "state": "NC"
            },
            "shop": {
                "id": 1,
                "name": "Roast and Toast"
            },
            "shop_id": 1,
            "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "user_id": 15
        }
    ],
    "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
    "website": "http://roastandtoast.com"
} -->

<!-- | GET /api/shops/{{shopId}}/reviews | Fetch all reviews by shop | Array of review objects |
[
    {
        "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
        "id": 4,
        "images": [
            {
                "id": 8,
                "img_link": "https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134128/BrewReview%20Shop%20Images/SIGNAL-3_mg0ff0.jpg",
                "preview_image": false
            }
        ],
        "rating": 4,
        "review": "Nice place to read a book while sipping coffee.",
        "reviewer": {
            "city": "Charlotte",
            "first_name": "Charles",
            "state": "NC"
        },
        "shop": {
            "id": 1,
            "name": "Roast and Toast"
        },
        "shop_id": 1,
        "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
        "user_id": 15
    }, -->

<!-- | GET /api/search/ | Search for shops | Array of shop objects |
[
    {
        "address": {
            "address_line1": "123 Espresso Lane",
            "address_line2": null,
            "city": "Philadelphia",
            "country": "United States of America",
            "id": 1,
            "postal_code": "19107",
            "state": "PA"
        },
        "avg_rating": "4.50",
        "categories": [
            "Outdoor Seating",
            "Organic Coffee",
            "Dinner Menu"
        ],
        "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
        "description": "Exceptional coffee and freshly baked goods.",
        "hours": {
            "friday": "7:00am - 8:00pm",
            "monday": "7:00am - 8:00pm",
            "saturday": "8:00am - 6:00pm",
            "sunday": "8:00am - 6:00pm",
            "thursday": "7:00am - 8:00pm",
            "tuesday": "7:00am - 8:00pm",
            "wednesday": "7:00am - 8:00pm"
        },
        "id": 1,
        "name": "Roast and Toast",
        "num_reviews": 4,
        "owner_id": 1,
        "phone_number": "5557890123",
        "preview_image": {
            "created_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "id": 1,
            "img_link": "https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg",
            "preview_image": true,
            "review_id": null,
            "shop_id": 1,
            "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
            "user_id": 1
        },
        "price_range": 3,
        "updated_at": "Wed, 12 Jun 2024 08:48:38 GMT",
        "website": "http://roastandtoast.com"
    }, -->

## Shops - CRUD
- Users should be able to view all Shops.
- Users should be able to add their own Shop.
- Users should be able to update their Shop information.
- Users should be able to delete their Shop.

        Required:
            - Name
            - Description
            - Images
            - Hours
            - Category(American, Plumbing, Korean, Carpentry)(At least 1, max 3)
            - Address
            - avg price (num of $)

        Optional:
            - Menu/Areas of Expertise (Up to 5 highlights)
            - Website
            - Number

        Accesses:
            - Reviews

- As a **Shop Owner** I want to be able to list my Shop so that I can improve Shop through word of mouth and recommendations, by consumers. I also want to be able to update/delete my Shop details, so that I can keep my Shop information up to date, or remove it.

- As a **Consumer** I want to view potential Shops in the area, so that I can learn how they are regarded by the general public, and decide if I want to do Shop with them.

## Reviews - CRUD
- Users should be able to view all reviews on a Shop.
- Users should be able to add a review to a Shop
- Users should be able to update their review on a Shop.
- Users should be able to delete their review from a Shop.

        Required:
            - Auth
            - Review
            - Rating

        Optional:
            - Review Images

        Accesses:
            - User (First Name/Last Name/Location/etc.)
            - Shop (Name/Existing Reviews/ect.)

- As a **Shop Owner** I want to be able to list my Shop' Reviews so that I can improve my Shop based on previous customers feedback, and attract new customers.

- As a **Consumer** I want to view reviews for Shops in the area, I can learn more about them, I also want to post my experiences at Shops that I have visited, so others can take my experiences into consideration. I also want to be able to update/delete my review details, so that I can keep my experience accurate pending any changes, or remove it.

## Search/Filter - CRU
- Users should be able to search by name, category, and or price.
- Users should be able to view the results of their search.

        Search Contents:
            - Name: text box
            - Category: Select Restaurant / Service
            - Tags: Radio R-Tags / S-tags (or search, can select multiple)
            - Price: Radio '$$$$$' select

- As a **General User** I want to be able to find certain types of Shops based on filters or keywords so that I can find the Shops that match my search.

## Images - CRD
- Users should be able to view all images on an associated Shop.
- Users should be able to add an image to either their Shop or a Shop they have visited.
- Users should be able to remove their images from a Shop.

        Accessed through:
            - ShopId
            - UserId
            - ReviewId (nullable)

- As a **Shop Owner** I want to be able to show off images of my Shop, both taken by me and by customers, so that I can attract new clients. I also want to be able to remove images that I submitted for my Shop, so that I can keep things up to date in the event of renovations.

- As a **Consumer** I want to view and Post images, for Shops that I have visited or that I am thinking about visiting, so that I can provide or receive general feedback about the Shops as a whole. I also want to be able to delete photos on my reviews, so that I can keep things fully accurate and up to date.

## Bonus: Google Maps API
- Users should be able to see Shop locations on google maps.

- Add location to search
- Add get directions

- As a **Shop Owner** I want to provide the location of my Shop so that my customers can easily acquire directions or details about the address.

- As a **Consumer** I want to be able to view where a Shop is, in regards to my location, so that I can evaluate if it is worth making the trip.

## Bonus: Friends
- Users should be able to view their friends reviews and images.
- Users should be able to add new friends.
- Users should be able to remove friends.

- As a **General User** I want to be able to view my friended accounts of people that I know or trust, so that I can see the reviews that they write and images they post. I also want to be able to add new friends, and remove old ones, so that I can be friends with only the people that I want to.

- Additional User Stories:
    - Users:
        - As a **New User** I want to be able to create an account so that I can use the service provided and save my data for future sessions.
        - As a **Existing User** I want to input my credentials so that I can access my existing account. I also want to be able to access my information and edit/delete my account to keep my information accurate and consistent.
        - As a **Logged in User** I want to leave my session, so that I can not be logged in anymore
