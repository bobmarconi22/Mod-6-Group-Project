from .db import db, environment, SCHEMA


class Address(db.Model):
    __tablename__ = 'addresses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    shop_id = db.Column(db.Integer, db.ForeignKey('shops.id'), nullable=False)
    address_line1 = db.Column(db.String(50), nullable=False)
    address_line2 = db.Column(db.String(50))
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    postal_code = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(50), nullable=False)

    shop = db.relationship('Shop', back_populates='address')

def to_dict(self):
    return {
        'id': self.id,
        'shop': self.shop.to_dict(),
        'address_line1': self.address_line1,
        'address_line2': self.address_line2,
        'city': self.city,
        'state': self.state,
        'postal_code': self.postal_code,
        'country': self.country,
    }