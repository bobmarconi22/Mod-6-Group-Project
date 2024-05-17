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
