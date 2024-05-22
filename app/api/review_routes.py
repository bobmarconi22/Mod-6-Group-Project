from flask import Blueprint, jsonify, abort
from flask_login import login_required, current_user
from app.models import Review, db
from sqlalchemy.orm import joinedload

review_routes = Blueprint('reviews', __name__)

# get all reviews by current user

@review_routes.route('/current')
@login_required
def current_user_reviews():

    reviews = Review.query.options(joinedload(Review.shop), joinedload(Review.image)).filter_by(user_id=current_user.id).all()


    return [review.to_dict(include_shop=True, include_reviewer=True) for review in reviews]


# delete review 

@review_routes.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_review(reviewId):

    review = Review.query.get(reviewId)
    if review is None:
        abort(404, description='Review not found')
    print('Current USER', current_user)
    print('REVIEW.USER_id', review.user_id)
    if current_user.id == review.user_id:
        db.session.delete(review)
        db.session.commit()
        return jsonify({'message': 'Review successfully deleted'}), 200
    abort(401, description='Unauthorized')



