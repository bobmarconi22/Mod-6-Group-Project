from .db import db, environment, SCHEMA

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    shop_id = db.Column(db.Integer, db.ForeignKey('shops.id'), nullable=False)
    review_id = db.Column(db.Integer, db.ForeignKey('reviews.id'))
    img_link = db.Column(db.String(50), nullable=False)
    preview_image = db.Column(db.Boolean, default=False)

    image_owner = db.relationship('User', back_populates='image')
    shop = db.relationship('Shop', back_populates='image')
    review = db.relationship('Review', back_populates='image')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'shop_id': self.shop_id,
            'review_id': self.review_id,
            'img_link': self.img_link,
            'preview_image': self.preview_image,
            'image_owner': self.image_owner.to_dict(),
            'shop': self.shop.to_dict(),
        }