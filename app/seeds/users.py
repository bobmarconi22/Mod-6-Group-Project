from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_users():
    print(' ================================= Starting Users')
    try:
        users = [
            User(first_name='Demo', last_name='User', username='demo_u', email='demo@aa.io', password='password', city='New York', state='NY', phone_number='555-555-0001'),
            User(first_name='Marnie', last_name='Smith', username='marnie_s', email='marnie@aa.io', password='password', city='Los Angeles', state='CA', phone_number='555-555-0002'),
            User(first_name='Bobbie', last_name='Brown', username='bobbie_b', email='bobbie@aa.io', password='password', city='Chicago', state='IL', phone_number='555-555-0003'),
            User(first_name='Alice', last_name='Johnson', username='alice_j', email='alice@aa.io', password='password', city='Houston', state='TX', phone_number='555-555-0004'),
            User(first_name='John', last_name='Doe', username='john_d', email='john@aa.io', password='password', city='Phoenix', state='AZ', phone_number='555-555-0005'),
            User(first_name='Jane', last_name='Doe', username='jane_d', email='jane@aa.io', password='password', city='Philadelphia', state='PA', phone_number='555-555-0006'),
            User(first_name='Mike', last_name='Davis', username='mike_d', email='mike@aa.io', password='password', city='San Antonio', state='TX', phone_number='555-555-0007'),
            User(first_name='Sarah', last_name='Miller', username='sarah_m', email='sarah@aa.io', password='password', city='San Diego', state='CA', phone_number='555-555-0008'),
            User(first_name='David', last_name='Wilson', username='david_w', email='david@aa.io', password='password', city='Dallas', state='TX', phone_number='555-555-0009'),
            User(first_name='Laura', last_name='Moore', username='laura_m', email='laura@aa.io', password='password', city='San Jose', state='CA', phone_number='555-555-0010'),
            User(first_name='James', last_name='Taylor', username='james_t', email='james@aa.io', password='password', city='Austin', state='TX', phone_number='555-555-0011'),
            User(first_name='Emily', last_name='Anderson', username='emily_a', email='emily@aa.io', password='password', city='Jacksonville', state='FL', phone_number='555-555-0012'),
            User(first_name='Robert', last_name='Thomas', username='robert_t', email='robert@aa.io', password='password', city='Fort Worth', state='TX', phone_number='555-555-0013'),
            User(first_name='Linda', last_name='Jackson', username='linda_j', email='linda@aa.io', password='password', city='Columbus', state='OH', phone_number='555-555-0014'),
            User(first_name='Charles', last_name='White', username='charles_w', email='charles@aa.io', password='password', city='Charlotte', state='NC', phone_number='555-555-0015')
        ]

        db.session.add_all(users)
        db.session.commit()
        print('======================================= users Success')
    except Exception as e:
        print(f'==================================== Error seeding users: {e}')
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
