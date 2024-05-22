from flask import Blueprint, jsonify
from app.models import db, Shop, selected_categories, Category
from sqlalchemy.orm import joinedload
from .utils import find_avg


search_routes = Blueprint('search', __name__)


@search_routes.route('/', methods=['POST'])
def search_shops():
   return
