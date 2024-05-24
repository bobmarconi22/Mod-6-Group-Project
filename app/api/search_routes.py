from flask import Blueprint, request, jsonify
from app.models import db, Shop, Image, Category
from sqlalchemy.orm import joinedload
from .utils import find_avg


search_routes = Blueprint('search', __name__)


@search_routes.route('/', methods=['GET'])
def search_shops():
   print("HITTING SEARCH ROUTE")
   query_params = request.args.to_dict()
   category = query_params.get('category')
   price_range = query_params.get('priceRange')
   name = query_params.get('name')

   filters = []

   if (name):
      filters.append(Shop.name.ilike(f"%{name}%"))
   if (category):
      print("category", category)
      filters.append(Category.name.ilike(f"%{category}%"))
   if(price_range):
      price_range_list = price_range.split(',')
      filters.append(Shop.price_range.in_(price_range_list))

   shops = Shop.query.options(joinedload(Shop.categories), joinedload(Shop.address), joinedload(Shop.review)).join(Shop.categories).filter(*filters).all()

   shop_dicts = []
   for shop in shops:
           shop_dict = shop.to_dict(include_categories=True)
           preview = Image.query.filter_by(shop_id = shop.id, preview_image=True).first()
           if(preview):
               preview = preview.to_dict()

           shop_dict['preview_image'] = preview
           avg_and_num_reviews = find_avg(shop)
           shop_dict['avg_rating'] = avg_and_num_reviews['avg']
           shop_dict['num_reviews'] = avg_and_num_reviews['num_reviews']
           del shop_dict['review']

           shop_dicts.append(shop_dict)


   return jsonify(shop_dicts)
