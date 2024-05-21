from flask import Blueprint, jsonify
from app.models import db, Category

category_routes = Blueprint('categories', __name__)

# GET ALL CATEGORIES
@category_routes.route("/")
def get_categories():
    categories = Category.query.all()
    print(categories)
    return jsonify([category.to_dict() for category in categories])
