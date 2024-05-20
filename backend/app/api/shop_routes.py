from flask import Blueprint, jsonify

from flask_login import login_required, current_user
from app.models import Shop, selected_category
from sqlalchemy.orm import joinedload


shop_routes = Blueprint('shops', __name__)


@shop_routes.route("/")
def get_all_shops():

    shops = Shop.query.options(joinedload(Shop.categories)).all()
