# Mod-6-Group-Project
Mod 6 Group Project - Yelp Clone

# Businesses
- Users should be able to view all businesses.
- Users should be able to add their own business.
- Users should be able to update their business information.
- Users should be able to delete their business.

- Name, Description, Images, Reviews, Hours, Category(Restaurant/Services), Tags(American, Plumbing, Korean, Carpentry), Address, Menu/Areas of Expertise (Up to 5 highlights), Website, Number, avg price (num of $),
- Foreign ID's
    - OwnerId
    - Reviews
    - Images

# Reviews
- Users should be able to view all reviews on a business.
- Users should be able to add a review to a business
- Users should be able to update their review on a business.
- Users should be able to delete their review from a business.

- Name, Review, Rating,

- Foreign ID's:
    - UserId
    - BusinessId
    - Photos

# Search/Filter
- Users should be able to search by name, category, and or price.
- Users should be able to view the results of their search.

- Name: text box
- Category: Select Restaurant / Service
- Tags: Radio R-Tags / S-tags (or search, can select multiple)
- Price: Radio '$$$$$' select

# Images
- Users should be able to view all images on an associated business.
- Users should be able to add an image to either their business or a business they have visited.
- Users should be able to remove their images from a business.

- Foreign Id's:
    - BusinessId
    - UserId
    - ReviewId (nullable)

# Bonus: Google Maps API
- Users should be able to see business locations on google maps.

- Add location to search
- Add get directions

# Bonus: Friends
- Users should be able to view their friends reviews and images.
- Users should be able to add new friends.
- Users should be able to remove friends.

- userTable:
    - Id
    - First Name
    - Last Name (Only Initial for Public)
    - Email
    - Phone (Optional)
    - Location

