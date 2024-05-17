from .db import db, environment, SCHEMA
from sqlalchemy.dialects.postgresql import JSON
from .user import User
from .address import Address
from .category import Category
from .review import Review
from .image import Image
from .menu import Menu

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
    price_range = db.Column(db.Integer)
    preview_image = db.Column(db.String(255), nullable=False)

    owner = db.relationship('User', back_populates='shops')
    address = db.relationship('Address', back_populates='shop')
    categories = db.relationship('SelectedCategory', back_populates='shop_id')
    reviews = db.relationship('Review', back_populates='shop')
    images = db.relationship('Image', back_populates='shop')
    menu = db.relationship('Menu', back_populates='shop')
