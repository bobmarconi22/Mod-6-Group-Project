from flask import Blueprint, jsonify, abort, request
from flask_login import login_required, current_user
from app.models import Review, db
from sqlalchemy.orm import joinedload
from ..forms import ReviewEditForm

review_routes = Blueprint('reviews', __name__)

# get all reviews by current user

@review_routes.route('/current')
@login_required
def current_user_reviews():

    reviews = Review.query.options(joinedload(Review.shop), joinedload(Review.image)).filter_by(user_id=current_user.id).all()


    return [review.to_dict(include_shop=True, include_reviewer=True) for review in reviews]

# edit a review 

@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required 
def update_review(review_id):
    
    review_to_edit = Review.query.get(review_id)

    if review_to_edit.user_id == current_user.id:
        review_form = ReviewEditForm()
        review_form['csrf_token'].data = request.cookies['csrf_token']
        if review_form.validate_on_submit():
            review_to_edit.rating = review_form.rating.data 
            review_to_edit.review = review_form.review.data
        
            db.session.commit()

            return jsonify(review_to_edit.to_dict())

    abort(401, description='Unauthorized')

    
 


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



