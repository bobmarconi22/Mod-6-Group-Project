
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm.attributes import instance_state
from datetime import datetime




class Shop(db.Model):
    __tablename__ = 'shops'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    hours = db.Column(JSON, nullable=False)
    website = db.Column(db.String(500), nullable=False)
    phone_number = db.Column(db.String(10))
    price_range = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    owner = db.relationship('User', back_populates='shop', uselist=False)
    address = db.relationship('Address', back_populates='shop', uselist=False, cascade='all, delete-orphan') #deletes address if shop is deleted
    categories= db.relationship('Category', secondary='selected_categories', back_populates='shops')
    review = db.relationship('Review', back_populates='shop', cascade='all, delete-orphan') #deletes all reviews if shop is deleted
    image = db.relationship('Image', back_populates='shop', cascade='all, delete-orphan') #deletes all images if shop is deleted
    menu = db.relationship('Menu', back_populates='shop', cascade='all, delete-orphan') #deletes all menus if shop deleted

    def to_dict(self, include_categories= False):
        state = instance_state(self)

        shop_dict = {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'description': self.description,
            'hours': self.hours,
            'website': self.website,
            'phone_number': self.phone_number,
            'price_range': self.price_range,
            'created_at': self.created_at,
            'updated_at': self.updated_at,

        }
            # Checks if they've been eager loaded and doesn't include if they aren't there
        if 'owner' in state.dict:
            shop_dict['owner'] = self.owner.to_dict() if self.owner else None
        if 'address' in state.dict:
            shop_dict['address'] = self.address.to_dict() if self.address else None
        if 'review' in state.dict:
            shop_dict['review'] = [rev.to_dict() for rev in self.review] if self.review else None
        if 'image' in state.dict:
            shop_dict['image'] = [img.to_dict() for img in self.image] if self.image else None
        if 'menu' in state.dict:
            shop_dict['menu'] = [menu_item.to_dict() for menu_item in self.menu] if self.menu else None

         #   Defaulting to not include categories will prevent an infinite loop since it's many to many.
        if include_categories:
            shop_dict['categories'] = [category.to_dict(include_shops=False, just_name=True) for category in self.categories]
        return {shop_dict['name']: shop_dict}



class Category(db.Model):
    __tablename__ = 'categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)

    shops = db.relationship('Shop', secondary='selected_categories', back_populates='categories')

    def to_dict(self, include_shops=False, just_name=False):

       category_dict =  {
            'id': self.id,
            'name': self.name,
        }

    #   Defaulting to not include shops will prevent an infinite loop.
       if include_shops:
        category_dict['shops'] = [shop.to_dict() for shop in self.shops]

       res = self.name if just_name else category_dict #if you want just the name in an array then include just_name=True
       return res


selected_categories = db.Table (
    "selected_categories",
    db.Column("shop_id", db.Integer, db.ForeignKey(add_prefix_for_prod('shops.id'), ondelete='CASCADE'), primary_key=True),
    db.Column("category_id", db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id'), ondelete='CASCADE'), primary_key=True)
)

if environment == "production":
    selected_categories.schema = SCHEMA
