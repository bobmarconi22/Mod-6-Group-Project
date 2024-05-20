from .db import db, environment, SCHEMA, add_prefix_for_prod

class Menu(db.Model):
    __tablename__ = 'menus'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(15), nullable=False)
    price = db.Column(db.Numeric, nullable=False)
    shop_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('shops.id')), nullable=False)
    popular_item = db.Column(db.Boolean, default=False)

    shop = db.relationship('Shop', back_populates='menu')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'shop_id': self.shop_id,
            'popular_item': self.popular_item,
        }
