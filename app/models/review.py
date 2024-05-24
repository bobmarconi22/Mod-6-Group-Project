from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm.attributes import instance_state
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    shop_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('shops.id'), ondelete='CASCADE'), nullable=False)
    review = db.Column(db.String(500), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    reviewer = db.relationship('User', back_populates='review')
    shop = db.relationship('Shop', back_populates='review')
    image = db.relationship('Image', back_populates='review', cascade='all, delete-orphan')

    def to_dict(self, include_shop=False, include_reviewer=False):
        state = instance_state(self)

        review_dict = {
            'id': self.id,
            'user_id': self.user_id,
            'shop_id': self.shop_id,
            'review': self.review,
            'rating': self.rating,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'reviewer': {
                'first_name': self.reviewer.first_name,
                'city': self.reviewer.city,
                'state': self.reviewer.state
            },
            'shop': {
                'name': self.shop.name,
                'id': self.shop.id
            }

        }
        if 'image' in state.dict:
            review_dict['images'] = [
                {   
                    'id': img.id,
                    'img_link': img.img_link,
                    'preview_image': img.preview_image
                }
                for img in self.image]


        return  review_dict
