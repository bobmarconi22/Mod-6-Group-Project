from .db import db, environment, SCHEMA

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    shop_id = db.Column(db.Integer, db.ForeignKey('shops.id'), nullable=False)
    review = db.Column(db.String(500), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    reviewer = db.relationship('User', back_populates='review')
    shop = db.relationship('Shop', back_populates='review')
    image = db.relationship('Image', back_populates='review')

    def to_dict(self):
       print("THIS IS PRINT====>", self.shop.to_dict())
       return { 
            'id': self.id,
            # 'user_id': self.user_id,
            'shop_id': self.shop_id,
            'review': self.review,
            'rating': self.rating,
            'reviewer': self.reviewer.to_dict(),
            # 'shop': self.shop.to_dict(),
            # 'image': [img.to_dict() for img in self.image]
        }
