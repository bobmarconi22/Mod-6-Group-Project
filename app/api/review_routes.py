from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Review, Shop, Image
from sqlalchemy.orm import joinedload

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/current')
@login_required
def current_user_reviews():

    reviews = Review.query.options(joinedload(Review.shop), joinedload(Review.image)).filter_by(user_id=current_user.id).all()


    return [review.to_dict(include_shop=True, include_reviewer=True) for review in reviews]


