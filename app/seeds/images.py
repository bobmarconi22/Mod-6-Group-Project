from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    images = [
        # Shop 1
        Image(user_id=1, shop_id=1, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=10, shop_id=1, review_id=1, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=False),
        Image(user_id=2, shop_id=1, review_id=2, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=False),
        Image(user_id=3, shop_id=1, review_id=3, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=False),
        Image(user_id=1, shop_id=1, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=False),
        Image(user_id=1, shop_id=1, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=False),

        # Shop 2
        Image(user_id=2, shop_id=2, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=4, shop_id=2, review_id=4, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=False),
        Image(user_id=5, shop_id=2, review_id=5, img_link='http://example.com/shop2_review2.jpg', preview_image=False),
        Image(user_id=6, shop_id=2, review_id=6, img_link='http://example.com/shop2_review3.jpg', preview_image=False),
        Image(user_id=2, shop_id=2, img_link='http://example.com/shop2_owner_additional1.jpg', preview_image=False),
        Image(user_id=2, shop_id=2, img_link='http://example.com/shop2_owner_additional2.jpg', preview_image=False),

        # Shop 3
        Image(user_id=3, shop_id=3, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=7, shop_id=3, review_id=7, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=False),
        Image(user_id=8, shop_id=3, review_id=8, img_link='http://example.com/shop3_review2.jpg', preview_image=False),
        Image(user_id=9, shop_id=3, review_id=9, img_link='http://example.com/shop3_review3.jpg', preview_image=False),
        Image(user_id=3, shop_id=3, img_link='http://example.com/shop3_owner_additional1.jpg', preview_image=False),
        Image(user_id=3, shop_id=3, img_link='http://example.com/shop3_owner_additional2.jpg', preview_image=False),

        # Shop 4
        Image(user_id=4, shop_id=4, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=10, shop_id=4, review_id=10, img_link='http://example.com/shop4_review1.jpg', preview_image=False),
        Image(user_id=11, shop_id=4, review_id=11, img_link='http://example.com/shop4_review2.jpg', preview_image=False),
        Image(user_id=12, shop_id=4, review_id=12, img_link='http://example.com/shop4_review3.jpg', preview_image=False),
        Image(user_id=4, shop_id=4, img_link='http://example.com/shop4_owner_additional1.jpg', preview_image=False),
        Image(user_id=4, shop_id=4, img_link='http://example.com/shop4_owner_additional2.jpg', preview_image=False),

        # Shop 5
        Image(user_id=5, shop_id=5, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=13, shop_id=5, review_id=13, img_link='http://example.com/shop5_review1.jpg', preview_image=False),
        Image(user_id=14, shop_id=5, review_id=14, img_link='http://example.com/shop5_review2.jpg', preview_image=False),
        Image(user_id=15, shop_id=5, review_id=15, img_link='http://example.com/shop5_review3.jpg', preview_image=False),
        Image(user_id=5, shop_id=5, img_link='http://example.com/shop5_owner_additional1.jpg', preview_image=False),
        Image(user_id=5, shop_id=5, img_link='http://example.com/shop5_owner_additional2.jpg', preview_image=False),

        # Shop 6
        Image(user_id=6, shop_id=6, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=1, shop_id=6, review_id=16, img_link='http://example.com/shop6_review1.jpg', preview_image=False),
        Image(user_id=2, shop_id=6, review_id=17, img_link='http://example.com/shop6_review2.jpg', preview_image=False),
        Image(user_id=3, shop_id=6, review_id=18, img_link='http://example.com/shop6_review3.jpg', preview_image=False),
        Image(user_id=6, shop_id=6, img_link='http://example.com/shop6_owner_additional1.jpg', preview_image=False),
        Image(user_id=6, shop_id=6, img_link='http://example.com/shop6_owner_additional2.jpg', preview_image=False),

        # Shop 7
        Image(user_id=7, shop_id=7, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=4, shop_id=7, review_id=19, img_link='http://example.com/shop7_review1.jpg', preview_image=False),
        Image(user_id=5, shop_id=7, review_id=20, img_link='http://example.com/shop7_review2.jpg', preview_image=False),
        Image(user_id=6, shop_id=7, review_id=21, img_link='http://example.com/shop7_review3.jpg', preview_image=False),
        Image(user_id=7, shop_id=7, img_link='http://example.com/shop7_owner_additional1.jpg', preview_image=False),
        Image(user_id=7, shop_id=7, img_link='http://example.com/shop7_owner_additional2.jpg', preview_image=False),

        # Shop 8
        Image(user_id=8, shop_id=8, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=7, shop_id=8, review_id=22, img_link='http://example.com/shop8_review1.jpg', preview_image=False),
        Image(user_id=8, shop_id=8, review_id=23, img_link='http://example.com/shop8_review2.jpg', preview_image=False),
        Image(user_id=9, shop_id=8, review_id=24, img_link='http://example.com/shop8_review3.jpg', preview_image=False),
        Image(user_id=8, shop_id=8, img_link='http://example.com/shop8_owner_additional1.jpg', preview_image=False),
        Image(user_id=8, shop_id=8, img_link='http://example.com/shop8_owner_additional2.jpg', preview_image=False),

        # Shop 9
        Image(user_id=9, shop_id=9, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=10, shop_id=9, review_id=25, img_link='http://example.com/shop9_review1.jpg', preview_image=False),
        Image(user_id=11, shop_id=9, review_id=26, img_link='http://example.com/shop9_review2.jpg', preview_image=False),
        Image(user_id=12, shop_id=9, review_id=27, img_link='http://example.com/shop9_review3.jpg', preview_image=False),
        Image(user_id=9, shop_id=9, img_link='http://example.com/shop9_owner_additional1.jpg', preview_image=False),
        Image(user_id=9, shop_id=9, img_link='http://example.com/shop9_owner_additional2.jpg', preview_image=False),

        # Shop 10
        Image(user_id=10, shop_id=10, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=13, shop_id=10, review_id=28, img_link='http://example.com/shop10_review1.jpg', preview_image=False),
        Image(user_id=14, shop_id=10, review_id=29, img_link='http://example.com/shop10_review2.jpg', preview_image=False),
        Image(user_id=15, shop_id=10, review_id=30, img_link='http://example.com/shop10_review3.jpg', preview_image=False),
        Image(user_id=10, shop_id=10, img_link='http://example.com/shop10_owner_additional1.jpg', preview_image=False),
        Image(user_id=10, shop_id=10, img_link='http://example.com/shop10_owner_additional2.jpg', preview_image=False)
    ]

    db.session.add_all(images)
    db.session.commit()

def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
