# Mod-6-Group-Project
Mod 6 Group Project - Yelp Clone

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
