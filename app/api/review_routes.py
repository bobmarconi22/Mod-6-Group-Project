from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Review

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/current')
@login_required
def current_user_reviews():

    reviews = Review.query.filter_by(user_id=current_user.id).all()

    print(reviews)

    user_reviews = [review.to_dict() for review in reviews]

    return user_reviews