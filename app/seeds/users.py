from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
        User(username='Demo', email='demo@aa.io', password='password', city='New York', state='NY', phone_number='555-555-0001'),
        User(username='marnie', email='marnie@aa.io', password='password', city='Los Angeles', state='CA', phone_number='555-555-0002'),
        User(username='bobbie', email='bobbie@aa.io', password='password', city='Chicago', state='IL', phone_number='555-555-0003'),
        User(username='alice', email='alice@aa.io', password='password', city='Houston', state='TX', phone_number='555-555-0004'),
        User(username='john', email='john@aa.io', password='password', city='Phoenix', state='AZ', phone_number='555-555-0005'),
        User(username='jane', email='jane@aa.io', password='password', city='Philadelphia', state='PA', phone_number='555-555-0006'),
        User(username='mike', email='mike@aa.io', password='password', city='San Antonio', state='TX', phone_number='555-555-0007'),
        User(username='sarah', email='sarah@aa.io', password='password', city='San Diego', state='CA', phone_number='555-555-0008'),
        User(username='david', email='david@aa.io', password='password', city='Dallas', state='TX', phone_number='555-555-0009'),
        User(username='laura', email='laura@aa.io', password='password', city='San Jose', state='CA', phone_number='555-555-0010'),
        User(username='james', email='james@aa.io', password='password', city='Austin', state='TX', phone_number='555-555-0011'),
        User(username='emily', email='emily@aa.io', password='password', city='Jacksonville', state='FL', phone_number='555-555-0012'),
        User(username='robert', email='robert@aa.io', password='password', city='Fort Worth', state='TX', phone_number='555-555-0013'),
        User(username='linda', email='linda@aa.io', password='password', city='Columbus', state='OH', phone_number='555-555-0014'),
        User(username='charles', email='charles@aa.io', password='password', city='Charlotte', state='NC', phone_number='555-555-0015')
    ]

    db.session.add_all(users)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
