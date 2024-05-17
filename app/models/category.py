from .db import db, environment, SCHEMA
from .shop import Shop

class Category(db.Model):
    __tablename__ = 'categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(15), nullable=False)

    selected = db.relationship('SelectedCategory', back_populates='category')
