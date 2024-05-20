
from .db import db, environment, SCHEMA, add_prefix_for_prod
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
    categories= db.relationship('Category', secondary='selected_category', back_populates='shops')
    review = db.relationship('Review', back_populates='shop')
    image = db.relationship('Image', back_populates='shop')
    menu = db.relationship('Menu', back_populates='shop')

    def to_dict(self, include_categories= False):

        shop_dict = {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'description': self.description,
            'hours': self.hours,
            'website': self.website,
            'phone_number': self.phone_number,
            'price_range': self.price_range,
            # 'owner': self.owner.to_dict(),
            'address': self.address.to_dict(),
            'review': [rev.to_dict() for rev in self.review],
            'image': [img.to_dict for img in self.image],
            'menu': [menu_item.to_dict() for menu_item in self.menu]
        }
         #   Defaulting to not include categories will prevent an infinite loop since it's many to many.
        if include_categories:
            shop_dict['categories'] = [category.to_dict() for category in self.categories]
        return shop_dict



class Category(db.Model):
    __tablename__ = 'categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)

    shops = db.relationship('Shop', secondary='selected_category', back_populates='categories')

    def to_dict(self, include_shops=False):
       category_dict =  {
            'id': self.id,
            'name': self.name,
        }
    #   Defaulting to not include shops will prevent an infinite loop.
       if include_shops:
        category_dict['shops'] = [shop.to_dict() for shop in self.shops]

        return category_dict


selected_category = db.Table (
    "selected_category",
    db.Column("shop_id", db.Integer, db.ForeignKey(add_prefix_for_prod('shops.id')), primary_key=True),
    db.Column("category_id", db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')), primary_key=True)

)

if environment == "production":
    selected_category.schema = SCHEMA
