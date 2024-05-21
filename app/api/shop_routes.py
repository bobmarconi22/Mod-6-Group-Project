from flask import Blueprint, jsonify

from flask_login import login_required, current_user
from app.models import Shop, selected_categories, Category, Image, Review
from sqlalchemy.orm import joinedload
from flask_login import login_required
from .utils import find_avg

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




# REVIEW ROUTES

#GET ALL REVIEWS BY SHOP'S ID
