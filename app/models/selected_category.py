from .db import db, environment, SCHEMA

class SelectedCategory(db.Model):
    __tablename__ = 'selected_categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    shop_id = db.Column(db.Integer,  db.ForeignKey('shops.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    category = db.relationship('Category', back_populates='selected')
    shop = db.relationship('Shop', back_populates='category')
