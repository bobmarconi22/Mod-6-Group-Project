from .db import db, environment, SCHEMA
from .shop import Shop

class Menu(db.Model):
    __tablename__ = 'menus'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(15), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    shop_id = db.Column(db.Integer, db.ForeignKey('shops.id'), nullable=False)
    popular_item = db.Column(db.Boolean, default=False)

    shop = db.relationship('Shop', back_populates='menu')
