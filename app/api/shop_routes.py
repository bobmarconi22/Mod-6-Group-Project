from flask import Blueprint, jsonify, request, abort, make_response
from flask_login import login_required, current_user
from app.models import db, Shop, Address, selected_categories, Category, Image, Review
from sqlalchemy import desc
from sqlalchemy.orm import joinedload
from flask_login import login_required
from ..forms.shop_form import ShopForm
from .utils import find_avg
from ..forms.address_form import AddressForm
from ..forms.review_form import ReviewForm

shop_routes = Blueprint('shops', __name__)

#GET SHOP BY ID
@shop_routes.route("/<int:id>")
def get_shop_by_id(id):
    shop = Shop.query.options(
        joinedload(Shop.categories),
        joinedload(Shop.address),
        joinedload(Shop.review),
        joinedload(Shop.image),
        joinedload(Shop.menu)
    ).get(id)
    if not shop:
        return jsonify({"error": "Shop not found"}), 404

    shop_dict = shop.to_dict(include_categories= True)
    avg_and_num_reviews = find_avg(shop)
    shop_dict['avg_rating'] = avg_and_num_reviews['avg']
    shop_dict['num_reviews'] = avg_and_num_reviews['num_reviews']


    return jsonify(shop_dict)

#GET ALL SHOPS OF CURRENT USER
@shop_routes.route("/current")
@login_required
def current_user_shops():
     shops = Shop.query.options(joinedload(Shop.categories), joinedload(Shop.address), joinedload(Shop.review)).filter_by(owner_id=current_user.id).all()
     shop_dicts = []
     for shop in shops:
          shop_dict = shop.to_dict(include_categories=True)
          preview_image = Image.query.filter_by(shop_id = shop.id, preview_image=True).first()
          if (preview_image):
            shop_dict['preview_image'] = preview_image.to_dict()
          avg_and_num_reviews = find_avg(shop)
          shop_dict['avg_rating'] = avg_and_num_reviews['avg']
          shop_dict['num_reviews'] = avg_and_num_reviews['num_reviews']

          del shop_dict['review']
          shop_dicts.append(shop_dict)

     return jsonify(shop_dicts)

# GET ALL SHOPS
@shop_routes.route("/")
def get_all_shops():
    print("SHOP ROUTES!!")
    shops = Shop.query.options(joinedload(Shop.categories), joinedload(Shop.address), joinedload(Shop.review)).all()
    shop_dicts = []
    for shop in shops:
         shop_dict = shop.to_dict(include_categories=True)
         preview_image = Image.query.filter_by(shop_id = shop.id, preview_image=True).first()
         if (preview_image):
            shop_dict['preview_image'] = preview_image.to_dict()
         avg_and_num_reviews = find_avg(shop)
         shop_dict['avg_rating'] = avg_and_num_reviews['avg']
         shop_dict['num_reviews'] = avg_and_num_reviews['num_reviews']
         del shop_dict['review']

         shop_dicts.append(shop_dict)


    return jsonify(shop_dicts)

# CREATE SHOP
@shop_routes.route("/new", methods=['POST'])
@login_required
def create_shop():
    print('hello from route')
    body = request.get_json()
    shop_form = ShopForm()
    address_form = AddressForm()
    shop_form['csrf_token'].data = request.cookies['csrf_token']
    address_form['csrf_token'].data = request.cookies['csrf_token']
    print(address_form.validate_on_submit())
    if shop_form.validate_on_submit() and address_form.validate_on_submit():

            hours = {}

            days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

            for day in days:

                day_open = f'{day}_open'
                day_close = f'{day}_close'

                if shop_form[day_open].data and shop_form[day_close].data:
                    hours[day] = f'{shop_form[day_open].data} - {shop_form[day_close].data}'
                else:
                    hours[day] = 'Closed'

            new_shop = Shop(
                name=shop_form.name.data,
                description=shop_form.description.data,
                hours=hours,
                website=shop_form.website.data,
                phone_number=shop_form.phone_number.data,
                price_range=shop_form.price_range.data,
                owner_id=current_user.id  # Assuming the Shop model has an owner_id field
            )

            db.session.add(new_shop)
            db.session.commit()

            new_image = Image(
                user_id = current_user.id,
                shop_id = new_shop.id,
                img_link = shop_form.preview_image.data,
                preview_image = True,
            )

            db.session.add(new_image)
            db.session.commit()

            new_shop_address = Address(
                shop_id=new_shop.id,
                address_line1=address_form.address_line1.data,
                address_line2=address_form.address_line2.data,
                city=address_form.city.data,
                state=address_form.state.data,
                postal_code=address_form.postal_code.data,
                country=address_form.country.data
            )
            db.session.add(new_shop_address)
            db.session.commit()

            categories = body.get('categories', [])
            for category_name in categories:
                category = Category.query.filter_by(name = category_name).first()
                db.session.execute(selected_categories.insert().values(shop_id=new_shop.id, category_id=category.id))
            db.session.commit()

            shop = Shop.query.options(joinedload(Shop.address), joinedload(Shop.categories)).filter_by(id = new_shop.id).first()

            print(jsonify(shop.to_dict(include_categories=True)))
            return jsonify(shop.to_dict(include_categories= True))


#UPDATE SHOP
@shop_routes.route("/<int:shop_id>/update", methods=['PUT'])
@login_required
def update_shop(shop_id):
    shop_to_update = Shop.query.get_or_404(shop_id)
    body = request.get_json()

    shop_form = ShopForm()
    address_form = AddressForm()

    shop_form['csrf_token'].data = request.cookies['csrf_token']
    address_form['csrf_token'].data = request.cookies['csrf_token']

    if shop_form.validate_on_submit() and address_form.validate_on_submit():

        hours = {}

        days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

        for day in days:

            day_open = f'{day}_open'
            day_close = f'{day}_close'

            if shop_form[day_open].data and shop_form[day_close].data:
                hours[day] = f'{shop_form[day_open].data} - {shop_form[day_close].data}'
            else:
                hours[day] = 'Closed'

        shop_to_update.name = shop_form.name.data
        shop_to_update.description = shop_form.description.data
        shop_to_update.website = shop_form.website.data
        shop_to_update.phone_number = shop_form.phone_number.data
        shop_to_update.price_range = shop_form.price_range.data
        shop_to_update.hours = hours

        address_to_update = shop_to_update.address
        address_to_update.address_line1 = address_form.address_line1.data
        address_to_update.address_line2 = address_form.address_line2.data
        address_to_update.city = address_form.city.data
        address_to_update.state = address_form.state.data
        address_to_update.postal_code = address_form.postal_code.data
        address_to_update.country = address_form.country.data

        shop_to_update.categories.clear()

        categories = body.get('categories', [])
        for category_name in categories:
            category = Category.query.filter_by(name = category_name).first()
            db.session.execute(selected_categories.insert().values(shop_id=shop_to_update.id, category_id=category.id))
        db.session.commit()

        return jsonify(shop_to_update.to_dict(include_categories=True))

    return jsonify({'error': 'Invalid data'}), 400




#DELETE SHOP
@shop_routes.route("/<int:shop_id>/delete", methods=['DELETE'])
@login_required
def delete_shop(shop_id):
    shop = Shop.query.get(shop_id)
    if not shop:
        return jsonify({"message": "Shop couldn't be found"}), 404
    # categories = selected_categories.query.filter(selected_categories.shop_id == shop_id).all()
    # reviews = Review.query.filter(Review.shop_id == shop_id).all()
    # address = Address.query.filter(Address.shop_id == shop_id).all()
    # images = Image.query.filter(Image.shop_id == shop_id).all()
    db.session.execute(
            selected_categories.delete().where(selected_categories.c.shop_id == shop_id)
        )
    db.session.delete(shop)
    # db.session.delete(categories)
    # db.session.delete(reviews)
    # db.session.delete(address)
    # db.session.delete(images)
    db.session.commit()
    return jsonify({"message": "Successfully deleted"}), 200




# ========================================================


#IMAGES
#Add an image to a shop by shop ID:
@shop_routes.route('/<int:shop_id>/images', methods=['POST'])
@login_required
def create_image(shop_id):
    print("route happening")
    body = request.get_json()
    print("BODY=========>", body)
    if(not body['img_link'].lower().endswith(("png", "jpg", "jpeg"))):
        return jsonify({"error": "Image url must be of type: png, jpg, or jpeg"}), 404

    if(body.get('preview_image')):
        preview_image = body['preview_image']
    else:
        preview_image = False

    new_image = Image(
        user_id = current_user.id,
        shop_id = shop_id,
        img_link = body['img_link'],
        preview_image = preview_image
    )
    if 'review_id' in body:
        new_image.review_id = body['review_id']


    db.session.add(new_image)
    db.session.commit()
    return make_response("Image created", 201)



#Delete an image from a shop based on shop ID:
@shop_routes.route('/<int:shop_id>/images/<int:image_id>', methods=['DELETE'])
@login_required
def delete_image(shop_id, image_id):
    print("HITTING DELETE ROUTE==========.")
    image = Image.query.get(image_id)
    if not image:
        response = jsonify({"message": "Shop Image couldn't be found"})
        response.status_code = 404
        return response
    if image.shop_id != shop_id:
        response = jsonify({"message": "Image does not belong to this shop"})
        response.status_code = 401
        return response
    db.session.delete(image)
    db.session.commit()
    return jsonify({"message": "Successfully deleted"}), 200





#=======================================================================


# REVIEW ROUTES

# Create a Review for a shop based on the shop's id

@shop_routes.route('/<int:shop_id>/reviews/new', methods=['POST'])
@login_required
def create_review(shop_id):
    body = request.get_json()

    review_form = ReviewForm()
    review_form['csrf_token'].data = request.cookies['csrf_token']
    if review_form.validate_on_submit():
        new_review = Review(
            user_id = current_user.id,
            shop_id = shop_id,
            review = review_form.review.data,
            rating = review_form.rating.data
        )
        db.session.add(new_review)
        db.session.commit()

        image_urls = [review_form.img_url1.data, review_form.img_url2.data, review_form.img_url3.data]
        for img_url in image_urls:
            if img_url:
                new_image = Image(
                    user_id=current_user.id,
                    shop_id=shop_id,
                    review_id=new_review.id,
                    img_link=img_url,
                    preview_image=False
                )
                db.session.add(new_image)

        db.session.commit()

        review = Review.query.options(joinedload(Review.image)).filter_by(id=new_review.id).first()

        return jsonify(review.to_dict(include_reviewer=True))

    else:
        return jsonify({'errors': review_form.errors})


# get all reviews by shop


@shop_routes.route('/<int:shopId>/reviews')
def get_all_reviews_by_shop(shopId):

    reviews = Review.query.options(joinedload(Review.image)).filter_by(shop_id = shopId).order_by(desc(Review.created_at)).all()

    reviews_to_dict = []
    for review in reviews:
        
        review_dict = review.to_dict(include_shop=True, include_reviewer=True)
        reviews_to_dict.append(review_dict)
        print("Review to dict =========================>", review_dict['updated_at'])

    return jsonify(reviews_to_dict)
