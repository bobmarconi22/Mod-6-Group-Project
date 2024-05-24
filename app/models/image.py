from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    shop_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('shops.id'), ondelete='CASCADE'), nullable=False)
    review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('reviews.id'), ondelete='CASCADE') )
    img_link = db.Column(db.String(2000), nullable=False)
    preview_image = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    image_owner = db.relationship('User', back_populates='image')
    shop = db.relationship('Shop', back_populates='image')
    review = db.relationship('Review', back_populates='image')

    def to_dict(self, include_image_owner=True):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'shop_id': self.shop_id,
            'review_id': self.review_id,
            'img_link': self.img_link,
            'preview_image': self.preview_image,
            'created_at': self.created_at,
            'updated_at': self.updated_at

        }
