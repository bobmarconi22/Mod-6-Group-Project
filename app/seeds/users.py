from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
        User(username='Demo', email='demo@aa.io', password='password'),
        User(username='marnie', email='marnie@aa.io', password='password'),
        User(username='bobbie', email='bobbie@aa.io', password='password'),
        User(username='alice', email='alice@aa.io', password='password'),
        User(username='john', email='john@aa.io', password='password'),
        User(username='jane', email='jane@aa.io', password='password'),
        User(username='mike', email='mike@aa.io', password='password'),
        User(username='sarah', email='sarah@aa.io', password='password'),
        User(username='david', email='david@aa.io', password='password'),
        User(username='laura', email='laura@aa.io', password='password'),
        User(username='james', email='james@aa.io', password='password'),
        User(username='emily', email='emily@aa.io', password='password'),
        User(username='robert', email='robert@aa.io', password='password'),
        User(username='linda', email='linda@aa.io', password='password'),
        User(username='charles', email='charles@aa.io', password='password')
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
