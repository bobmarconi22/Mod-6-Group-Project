from .db import db, environment, SCHEMA
from sqlalchemy.dialects.postgresql import JSON

class Shop(db.Model):
    __tablename__ = 'shops'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    hours = db.Column(JSON, nullable=False)
    website = db.Column(db.String(500), nullable=False)
    phone_number = db.Column(db.String(10))
    price_range = db.Column(db.Integer, nullable=False)

    owner = db.relationship('User', back_populates='shop')
    address = db.relationship('Address', back_populates='shop')
    category = db.relationship('SelectedCategory', back_populates='shop')
    review = db.relationship('Review', back_populates='shop')
    image = db.relationship('Image', back_populates='shop')
    menu = db.relationship('Menu', back_populates='shop')
