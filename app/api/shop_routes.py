from flask import Blueprint, jsonify

from flask_login import login_required, current_user
from app.models import db, Shop, Address, selected_categories, Category, Image, Review
from sqlalchemy.orm import joinedload
from flask_login import login_required
from ..forms.shop_form import ShopForm
from .utils import find_avg
from ..forms.address_form import AddressForm

shop_routes = Blueprint('shops', __name__)



#GET SHOP BY ID
@shop_routes.route("/<int:id>")
def get_shop_by_id(id):
    shop = Shop.query.options(
        joinedload(Shop.categories),
        joinedload(Shop.address),
        joinedload(Shop.review),
        joinedload(Shop.image)
    ).get(id)
    if not shop:
        return jsonify({"error": "Shop not found"}), 404

    shop_dict = shop.to_dict(include_categories= True)
    avg = find_avg(shop)
    shop_dict['avg_rating'] = avg

    return jsonify(shop_dict)

#GET ALL SHOPS OF CURRENT USER
@shop_routes.route("/current")
@login_required
def current_user_shops():
     shops = Shop.query.options(joinedload(Shop.categories), joinedload(Shop.address), joinedload(Shop.review)).filter_by(owner_id=current_user.id).all()
     shop_dicts = []
     for shop in shops:
          shop_dict = shop.to_dict(include_categories=True)
          shop_dict['preview_image'] = Image.query.filter_by(shop_id = shop.id, preview_image=True).first().to_dict()
          avg = find_avg(shop)
          shop_dict['avg_rating'] = avg
          del shop_dict[shop.name]['review']
          shop_dicts.append(shop_dict)

     return jsonify(shop_dicts)

# GET ALL SHOPS
@shop_routes.route("/")

def get_all_shops():
    shops = Shop.query.options(joinedload(Shop.categories), joinedload(Shop.address), joinedload(Shop.review)).all()
    shop_dicts = []
    for shop in shops:
         shop_dict = shop.to_dict(include_categories=True)
         shop_dict['preview_image'] = Image.query.filter_by(shop_id = shop.id, preview_image=True).first().to_dict()
         avg = find_avg(shop)
         del shop_dict[shop.name]['review']
         shop_dict['avg_rating'] = avg
         shop_dicts.append(shop_dict)


    return jsonify(shop_dicts)

# CREATE SHOP
@shop_routes.route("/new-shop", methods=['POST'])
def create_shop(body):
    shop_form = ShopForm(body.shop)
    if shop_form.validate_on_submit():
        new_shop = Shop(
            name=shop_form.name.data,
            description=shop_form.description.data,
            hours = {
                'monday': f'{shop_form.monday_open.data} - {shop_form.monday_close.data}',
                'tuesday': f'{shop_form.tuesday_open.data} - {shop_form.tuesday_close.data}',
                'wednesday': f'{shop_form.wednesday_open.data} - {shop_form.wednesday_close.data}',
                'thursday': f'{shop_form.thursday_open.data} - {shop_form.thursday_close.data}',
                'friday': f'{shop_form.friday_open.data} - {shop_form.friday_close.data}',
                'saturday': f'{shop_form.saturday_open.data} - {shop_form.saturday_close.data}',
                'sunday': f'{shop_form.sunday_open.data} - {shop_form.sunday_close.data}',
            },
            website=shop_form.website.data,
            phone_number=shop_form.phone_number.data,
            price_range=shop_form.price_range.data
        )

        db.session.add(new_shop)
        db.session.commit()

        new_id = Shop.query.filter(Shop.name == shop_form.name.data)

        address_form = AddressForm(body.address)
        new_shop_address = Address(
            shop_id = new_id,
            address_line1=address_form.address_line1.data,
            address_line2=address_form.address_line2.data,
            city=address_form.city.data,
            state=address_form.state.data,
            postal=address_form.postal.data,
            country=address_form.country.data
        )
        db.session.add(new_shop_address)
        db.session.commit()






# REVIEW ROUTES

#GET ALL REVIEWS BY SHOP'S ID
