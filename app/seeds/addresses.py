from app.models import db, Address, environment, SCHEMA
from sqlalchemy.sql import text

def seed_addresses():
    addresses = [
        Address(
            shop_id=1, address_line1='123 Espresso Lane', city='Philadelphia', state='PA', postal_code='19107', country='United States of America'
        ),
        Address(
            shop_id=2, address_line1='456 Cappuccino Court', city='New York', state='NY', postal_code='10001', country='United States of America'
        ),
        Address(
            shop_id=3, address_line1='789 Latte Boulevard', city='San Francisco', state='CA', postal_code='94107', country='United States of America'
        ),
        Address(
            shop_id=4, address_line1='101 Mocha Street', city='Chicago', state='IL', postal_code='60607', country='United States of America'
        ),
        Address(
            shop_id=5, address_line1='202 Americano Avenue', city='Seattle', state='WA', postal_code='98101', country='United States of America'
        ),
        Address(
            shop_id=6, address_line1='303 Macchiato Road', city='Austin', state='TX', postal_code='78701', country='United States of America'
        ),
        Address(
            shop_id=7, address_line1='404 Brew Boulevard', city='Miami', state='FL', postal_code='33101', country='United States of America'
        ),
        Address(
            shop_id=8, address_line1='505 Java Parkway', city='Los Angeles', state='CA', postal_code='90001', country='United States of America'
        ),
        Address(
            shop_id=9, address_line1='606 Cortado Court', city='Dallas', state='TX', postal_code='75201', country='United States of America'
        ),
        Address(
            shop_id=10, address_line1='707 Flat White Way', city='Denver', state='CO', postal_code='80201', country='United States of America'
        )
    ]

    db.session.add_all(addresses)
    db.session.commit()

def undo_addresses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.addresses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM addresses"))

    db.session.commit()
