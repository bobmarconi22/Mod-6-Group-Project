from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    images = [
        # Shop 1
        Image(user_id=1, shop_id=1, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=10, shop_id=1, review_id=1, img_link='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwVoF49SZ-Hu3hAQywEIkoJWQz1nK4lQ-CXBYbctbP-g&s', preview_image=False),
        Image(user_id=2, shop_id=1, review_id=2, img_link='https://images.squarespace-cdn.com/content/v1/572e312db654f906290c6a68/1518029229926-IA875XL3TC5UAHTENJW3/unnamed-7.jpg', preview_image=False),
        Image(user_id=3, shop_id=1, review_id=3, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/X5tKF5x7aF3dH9o8o9_udA/348s.jpg', preview_image=False),
        Image(user_id=1, shop_id=1, img_link='https://media-cdn.tripadvisor.com/media/photo-s/14/69/bd/9e/shakshuka-12-at-cafe.jpg', preview_image=False),
        Image(user_id=1, shop_id=1, img_link='https://media.timeout.com/images/105179583/image.jpg', preview_image=False),
        Image(user_id=1, shop_id=1, img_link='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134128/BrewReview%20Shop%20Images/SIGNAL-1_nmasfb.jpg', preview_image=False),
        Image (user_id=16, shop_id=1, review_id=4, img_link='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134128/BrewReview%20Shop%20Images/SIGNAL-3_mg0ff0.jpg', preview_image=False),

        # Shop 2
        Image(user_id=2, shop_id=2, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/bCLn6LFGA03RHtwqAdfXAA/o.jpg', preview_image=True),
        Image(user_id=4, shop_id=2, review_id=5, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/ZQyJOenQeNnv0X1qDPZIXA/348s.jpg', preview_image=False),
        Image(user_id=5, shop_id=2, review_id=6, img_link='https://www.posist.com/restaurant-times/wp-content/uploads/2023/07/How-To-Start-A-Coffee-Shop-Business-A-Complete-Guide.jpg', preview_image=False),
        Image(user_id=6, shop_id=2, review_id=7, img_link='https://reveillecafe.com/wp-content/uploads/2019/02/Mystic-French-Toast-with-Bacon-cropped.jpg', preview_image=False),
        Image(user_id=2, shop_id=2, img_link='https://i0.wp.com/newspack-berkeleyside-cityside.s3.amazonaws.com/wp-content/uploads/2018/04/DSC_0142.jpg?fit=1500%2C994&ssl=1', preview_image=False),
        Image(user_id=2, shop_id=2, img_link='https://media.timeout.com/images/105179583/image.jpg', preview_image=False),
        Image(user_id=4, shop_id=2, review_id=5, img_link='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134129/BrewReview%20Shop%20Images/VPC-1_cb6k5w.jpg', preview_image = False),
        Image(user_id=4, shop_id=2, review_id=5, img_link='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134128/BrewReview%20Shop%20Images/VPC-2_wgpsin.jpg', preview_image=False),
        Image(user_id=6, shop_id=2, review_id=7, img_link='https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134127/BrewReview%20Shop%20Images/VPC-3_aptfuc.jpg', preview_image=False),

        # Shop 3
        Image(user_id=3, shop_id=3, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/FF041pESeN3VfOt34Im_aQ/o.jpg', preview_image=True),
        Image(user_id=7, shop_id=3, review_id=7, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=False),
        Image(user_id=8, shop_id=3, review_id=8, img_link='https://www.posist.com/restaurant-times/wp-content/uploads/2023/07/How-To-Start-A-Coffee-Shop-Business-A-Complete-Guide.jpg', preview_image=False),
        Image(user_id=9, shop_id=3, review_id=9, img_link='https://www.posist.com/restaurant-times/wp-content/uploads/2023/07/How-To-Start-A-Coffee-Shop-Business-A-Complete-Guide.jpg', preview_image=False),
        Image(user_id=3, shop_id=3, img_link='https://media-cdn.tripadvisor.com/media/photo-s/14/69/bd/9e/shakshuka-12-at-cafe.jpg', preview_image=False),
        Image(user_id=3, shop_id=3, img_link='https://media.timeout.com/images/105179583/image.jpg', preview_image=False),

        # Shop 4
        Image(user_id=4, shop_id=4, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/_XEi2EWcPYIVM8HEZG6Yxg/o.jpg', preview_image=True),
        Image(user_id=10, shop_id=4, review_id=10, img_link='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwVoF49SZ-Hu3hAQywEIkoJWQz1nK4lQ-CXBYbctbP-g&s', preview_image=False),
        Image(user_id=11, shop_id=4, review_id=11, img_link='https://media.timeout.com/images/105179583/image.jpg', preview_image=False),
        Image(user_id=12, shop_id=4, review_id=12, img_link='https://www.posist.com/restaurant-times/wp-content/uploads/2023/07/How-To-Start-A-Coffee-Shop-Business-A-Complete-Guide.jpg', preview_image=False),
        Image(user_id=4, shop_id=4, img_link='https://assets.bonappetit.com/photos/570eb491ea4ae08245db648f/16:9/w_2560,c_limit/sightglass-san-francisco-coffee-shop-interior-lead-image.jpg', preview_image=False),
        Image(user_id=4, shop_id=4, img_link='https://media.cntraveler.com/photos/5a8037c1e9c49e2e4d80a36d/16:9/w_2560%2Cc_limit/Sightglass__2018_Divisidero_Sightglass_Interior_3541.jpg', preview_image=False),

        # Shop 5
        Image(user_id=5, shop_id=5, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/C1JQMPLgtkZruHOjia8B9w/o.jpg', preview_image=True),
        Image(user_id=13, shop_id=5, review_id=13, img_link='https://goop-img.com/wp-content/uploads/2015/08/sightglass-2.jpg', preview_image=False),
        Image(user_id=14, shop_id=5, review_id=14, img_link='https://dxkmbl8uwuv9p.cloudfront.net/sightglass-coffee-store/1536646301404/efe5e8dd-890d-4416-9bfd-07387e3405cc/sightglass_soma_roasting@1x-0467ca5e48655527a59fb32cb826291f.jpg', preview_image=False),
        Image(user_id=15, shop_id=5, review_id=15, img_link='https://media-cdn.tripadvisor.com/media/photo-s/03/85/f0/4d/sightglass-coffee-bar.jpg', preview_image=False),
        Image(user_id=5, shop_id=5, img_link='https://pullandpourcoffee.com/wp-content/uploads/2022/04/ethiopia-worka-chelbessa-sightglass-coffee.jpg', preview_image=False),
        Image(user_id=5, shop_id=5, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/Iwgn7tb-osuYithmTimpvQ/348s.jpg', preview_image=False),

        # Shop 6
        Image(user_id=6, shop_id=6, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/Rb8BJvZ91Ol8IDm3Xojoig/o.jpg', preview_image=True),
        Image(user_id=1, shop_id=6, review_id=16, img_link='https://d259o9es2o749h.cloudfront.net/wp-content/uploads/2020/08/22202409/PALM-52-scaled-e1600831479551.jpg', preview_image=False),
        Image(user_id=2, shop_id=6, review_id=17, img_link='https://blog.mistobox.com/wp-content/uploads/2016/04/best-coffee-in-san-francisco.jpg', preview_image=False),
        Image(user_id=3, shop_id=6, review_id=18, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/ZQyJOenQeNnv0X1qDPZIXA/348s.jpg', preview_image=False),
        Image(user_id=6, shop_id=6, img_link='https://dailycoffeenews.com/wp-content/uploads/2020/05/Inside-Sightglass-Hollywood.jpg', preview_image=False),
        Image(user_id=6, shop_id=6, img_link='https://sprudge.com/wp-content/uploads/2014/02/sightglass-coffee-mission-bar-marzocco-640x480.jpg', preview_image=False),

        # Shop 7
        Image(user_id=7, shop_id=7, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/zBtvcUvMqQBc6AGSClbKeQ/o.jpg', preview_image=True),
        Image(user_id=4, shop_id=7, review_id=19, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/ZQyJOenQeNnv0X1qDPZIXA/348s.jpg', preview_image=False),
        Image(user_id=5, shop_id=7, review_id=20, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/ZQyJOenQeNnv0X1qDPZIXA/348s.jpg', preview_image=False),
        Image(user_id=6, shop_id=7, review_id=21, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/ZQyJOenQeNnv0X1qDPZIXA/348s.jpg', preview_image=False),
        Image(user_id=7, shop_id=7, img_link='https://media-cdn.tripadvisor.com/media/photo-s/17/e6/1d/5d/excellently-smooth-tasty.jpg', preview_image=False),
        Image(user_id=7, shop_id=7, img_link='https://media-cdn.tripadvisor.com/media/photo-s/11/76/f7/f1/photo5jpg.jpg', preview_image=False),

        # Shop 8
        Image(user_id=8, shop_id=8, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/ZTPFrU5hmdDKgfZ3f-C8yg/o.jpg', preview_image=True),
        Image(user_id=7, shop_id=8, review_id=22, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/ZQyJOenQeNnv0X1qDPZIXA/348s.jpg', preview_image=False),
        Image(user_id=8, shop_id=8, review_id=23, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/ZQyJOenQeNnv0X1qDPZIXA/348s.jpg', preview_image=False),
        Image(user_id=9, shop_id=8, review_id=24, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/ZQyJOenQeNnv0X1qDPZIXA/348s.jpg', preview_image=False),
        Image(user_id=8, shop_id=8, img_link='https://d1bb1mccaihlpl.cloudfront.net/variants/lk7vugl4n9f5psshwbyvrh9mc8hy/5495488087431af32265aaaaa1b8a274541d70555aa4d7c01d8d0fed27e7c152', preview_image=False),
        Image(user_id=8, shop_id=8, img_link='https://feelgoodfoodie.net/wp-content/uploads/2020/03/Whipped-Coffee-10-2.jpg', preview_image=False),

        # Shop 9
        Image(user_id=9, shop_id=9, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/kpZ5C_dwupPbtwfvuZKYXg/o.jpg', preview_image=True),
        Image(user_id=10, shop_id=9, review_id=25, img_link='https://www.eatingwell.com/thmb/ekNUGKJ50lP7-p2V4B-3W2mnq_0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/coffee_960-7882dec1ea02416d830a0747eb657a2f.jpg', preview_image=False),
        Image(user_id=11, shop_id=9, review_id=26, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/ZQyJOenQeNnv0X1qDPZIXA/348s.jpg', preview_image=False),
        Image(user_id=12, shop_id=9, review_id=27, img_link='https://images.squarespace-cdn.com/content/v1/5be4ea9b55b02cf09b6748bd/1545431394289-M7WNVYQ3RLA77UCR1XQG/vliguszakxaxcuohlksa.jpg', preview_image=False),
        Image(user_id=9, shop_id=9, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/ZQyJOenQeNnv0X1qDPZIXA/348s.jpg', preview_image=False),
        Image(user_id=9, shop_id=9, img_link='https://sprudge.com/wp-content/uploads/2016/11/Sprudge-SaintFrankAtFacebook-NoahSanders-3P3A3034-740x494.jpg', preview_image=False),

        # Shop 10
        Image(user_id=10, shop_id=10, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/J8bkWnKu0CNfnHcY0TdDtw/o.jpg', preview_image=True),
        Image(user_id=13, shop_id=10, review_id=28, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/iOGF6C8CQ8tIeiHimgDiZw/348s.jpg', preview_image=False),
        Image(user_id=14, shop_id=10, review_id=29, img_link='https://img.hoodline.com/uploads/story/image/35361/cakelatte.jpg', preview_image=False),
        Image(user_id=15, shop_id=10, review_id=30, img_link='https://www.architecturalrecord.com/ext/resources/Issues/2019/06-June/GDGB/Blue-Bottle-Coffee/1906-GDGB-Blue-Bottle-Coffee-Various-locations-Bohlin-Cywinski-Jackson-01.jpg?height=635&t=1559067424&width=1200', preview_image=False),
        Image(user_id=10, shop_id=10, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/2x7W81UeZOENZ1b0LLIjKQ/348s.jpg', preview_image=False),
        Image(user_id=10, shop_id=10, img_link='https://www.bcj.com/wp-content/uploads/2021/08/Blue-Bottle-Stanford_AR_0275_medium.jpg', preview_image=False)
    ]


# https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134127/BrewReview%20Shop%20Images/MIND-2_at1xsu.jpg
# https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134127/BrewReview%20Shop%20Images/MIND-1_jzls3u.jpg
# https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134127/BrewReview%20Shop%20Images/MIND-3_vfp6oh.jpg
# https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134126/BrewReview%20Shop%20Images/MIND-4_ogtwve.jpg
# https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134125/BrewReview%20Shop%20Images/MIND-5_hlaj2c.jpg
# https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134125/BrewReview%20Shop%20Images/CORO-1_ibwrab.jpg
# https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134126/BrewReview%20Shop%20Images/CORO-2_ord45y.jpg
# https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134125/BrewReview%20Shop%20Images/CORO-3_rzfbcs.jpg
# https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134125/BrewReview%20Shop%20Images/CORO-4_cb6qth.jpg
# https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134126/BrewReview%20Shop%20Images/1951-1_b6t8ii.jpg
# https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134126/BrewReview%20Shop%20Images/1951-3_qzdpsg.jpg
# https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134126/BrewReview%20Shop%20Images/1951-2_x3fpjy.jpg
# https://res.cloudinary.com/dn8wjgxgv/image/upload/v1718134125/BrewReview%20Shop%20Images/CORO-5_bpb8zz.jpg

    db.session.add_all(images)
    db.session.commit()

def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
