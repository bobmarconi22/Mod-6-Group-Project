from flask import Blueprint, jsonify

from flask_login import login_required, current_user
from app.models import Shop, selected_categories, Category
from sqlalchemy.orm import joinedload


shop_routes = Blueprint('shops', __name__)


@shop_routes.route("/")
def get_all_shops():
    shops = Shop.query.options(joinedload(Shop.categories), joinedload(Shop.address)).all()
    categories = Category.query.options(joinedload(Category.shops)).all()
    print("SHOPS BEFORE JSON", shops)
    print("categories before JSON", categories)

    return jsonify([shop.to_dict(include_categories=True) for shop in shops])
