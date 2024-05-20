from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm.attributes import instance_state

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    shop_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('shops.id'), ondelete='CASCADE'), nullable=False)
    review = db.Column(db.String(500), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

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
            'reviewer': self.reviewer.to_dict() if self.reviewer else None,
            # 'shop': self.shop.to_dict(),

        }
        if 'image' in state.dict:
             review_dict['images'] = [img.to_dict() for img in self.image]

        if include_reviewer:
            review_dict['reviewer'] = self.reviewer.to_dict()

        if include_shop:
           review_dict['shop'] = self.shop.to_dict()

        return  review_dict
