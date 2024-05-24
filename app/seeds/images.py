from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    images = [
        # Shop 1
        Image(user_id=1, shop_id=1, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=10, shop_id=1, review_id=1, img_link='https://cdn.vox-cdn.com/thumbor/cBi0hSPVwOguGd0E2mU1o3h0uxk=/0x0:2000x1333/1200x800/filters:focal(840x507:1160x827)/cdn.vox-cdn.com/uploads/chorus_image/image/58802817/CafeReveille_PChang_6003.0.jpg', preview_image=False),
        Image(user_id=2, shop_id=1, review_id=2, img_link='https://images.squarespace-cdn.com/content/v1/572e312db654f906290c6a68/1518029229926-IA875XL3TC5UAHTENJW3/unnamed-7.jpg', preview_image=False),
        Image(user_id=3, shop_id=1, review_id=3, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/X5tKF5x7aF3dH9o8o9_udA/348s.jpg', preview_image=False),
        Image(user_id=1, shop_id=1, img_link='https://media-cdn.tripadvisor.com/media/photo-s/14/69/bd/9e/shakshuka-12-at-cafe.jpg', preview_image=False),
        Image(user_id=1, shop_id=1, img_link='https://media.timeout.com/images/105179583/image.jpg', preview_image=False),

        # Shop 2
        Image(user_id=2, shop_id=2, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=4, shop_id=2, review_id=4, img_link='https://cdn.vox-cdn.com/thumbor/41OBxMP6B6wIHBceYfgmvjzaey0=/0x0:2000x1333/1200x0/filters:focal(0x0:2000x1333):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/10288311/CafeReveille_PChang_5986.jpg', preview_image=False),
        Image(user_id=5, shop_id=2, review_id=5, img_link='https://images.squarespace-cdn.com/content/v1/56d3607086db43f4f775d205/1467992469962-1XHT2IEJP7BHI0XOGDST/image-asset.jpeg', preview_image=False),
        Image(user_id=6, shop_id=2, review_id=6, img_link='https://reveillecafe.com/wp-content/uploads/2019/02/Mystic-French-Toast-with-Bacon-cropped.jpg', preview_image=False),
        Image(user_id=2, shop_id=2, img_link='https://i0.wp.com/newspack-berkeleyside-cityside.s3.amazonaws.com/wp-content/uploads/2018/04/DSC_0142.jpg?fit=1500%2C994&ssl=1', preview_image=False),
        Image(user_id=2, shop_id=2, img_link='https://media.timeout.com/images/105179583/image.jpg', preview_image=False),

        # Shop 3
        Image(user_id=3, shop_id=3, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=7, shop_id=3, review_id=7, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=False),
        Image(user_id=8, shop_id=3, review_id=8, img_link='https://images.squarespace-cdn.com/content/v1/56d3607086db43f4f775d205/1467992469962-1XHT2IEJP7BHI0XOGDST/image-asset.jpeg', preview_image=False),
        Image(user_id=9, shop_id=3, review_id=9, img_link='https://images.squarespace-cdn.com/content/v1/56d3607086db43f4f775d205/1467992469962-1XHT2IEJP7BHI0XOGDST/image-asset.jpeg', preview_image=False),
        Image(user_id=3, shop_id=3, img_link='https://media-cdn.tripadvisor.com/media/photo-s/14/69/bd/9e/shakshuka-12-at-cafe.jpg', preview_image=False),
        Image(user_id=3, shop_id=3, img_link='https://media.timeout.com/images/105179583/image.jpg', preview_image=False),

        # Shop 4
        Image(user_id=4, shop_id=4, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=10, shop_id=4, review_id=10, img_link='https://cdn.vox-cdn.com/thumbor/cBi0hSPVwOguGd0E2mU1o3h0uxk=/0x0:2000x1333/1200x800/filters:focal(840x507:1160x827)/cdn.vox-cdn.com/uploads/chorus_image/image/58802817/CafeReveille_PChang_6003.0.jpg', preview_image=False),
        Image(user_id=11, shop_id=4, review_id=11, img_link='https://media.timeout.com/images/105179583/image.jpg', preview_image=False),
        Image(user_id=12, shop_id=4, review_id=12, img_link='https://images.squarespace-cdn.com/content/v1/56d3607086db43f4f775d205/1467992469962-1XHT2IEJP7BHI0XOGDST/image-asset.jpeg', preview_image=False),
        Image(user_id=4, shop_id=4, img_link='https://assets.bonappetit.com/photos/570eb491ea4ae08245db648f/16:9/w_2560,c_limit/sightglass-san-francisco-coffee-shop-interior-lead-image.jpg', preview_image=False),
        Image(user_id=4, shop_id=4, img_link='https://media.cntraveler.com/photos/5a8037c1e9c49e2e4d80a36d/16:9/w_2560%2Cc_limit/Sightglass__2018_Divisidero_Sightglass_Interior_3541.jpg', preview_image=False),

        # Shop 5
        Image(user_id=5, shop_id=5, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=13, shop_id=5, review_id=13, img_link='https://goop-img.com/wp-content/uploads/2015/08/sightglass-2.jpg', preview_image=False),
        Image(user_id=14, shop_id=5, review_id=14, img_link='https://dxkmbl8uwuv9p.cloudfront.net/sightglass-coffee-store/1536646301404/efe5e8dd-890d-4416-9bfd-07387e3405cc/sightglass_soma_roasting@1x-0467ca5e48655527a59fb32cb826291f.jpg', preview_image=False),
        Image(user_id=15, shop_id=5, review_id=15, img_link='https://media-cdn.tripadvisor.com/media/photo-s/03/85/f0/4d/sightglass-coffee-bar.jpg', preview_image=False),
        Image(user_id=5, shop_id=5, img_link='https://pullandpourcoffee.com/wp-content/uploads/2022/04/ethiopia-worka-chelbessa-sightglass-coffee.jpg', preview_image=False),
        Image(user_id=5, shop_id=5, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/Iwgn7tb-osuYithmTimpvQ/348s.jpg', preview_image=False),

        # Shop 6
        Image(user_id=6, shop_id=6, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=1, shop_id=6, review_id=16, img_link='https://chateautivoli.com/wp-content/uploads/2024/01/breakslow-UMUCQcDdLws-unsplash.jpg', preview_image=False),
        Image(user_id=2, shop_id=6, review_id=17, img_link='https://blog.mistobox.com/wp-content/uploads/2016/04/best-coffee-in-san-francisco.jpg', preview_image=False),
        Image(user_id=3, shop_id=6, review_id=18, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/_gdRlfJacx2WPVTLQhc7vg/1000s.jpg', preview_image=False),
        Image(user_id=6, shop_id=6, img_link='https://dailycoffeenews.com/wp-content/uploads/2020/05/Inside-Sightglass-Hollywood.jpg', preview_image=False),
        Image(user_id=6, shop_id=6, img_link='https://sprudge.com/wp-content/uploads/2014/02/sightglass-coffee-mission-bar-marzocco-640x480.jpg', preview_image=False),

        # Shop 7
        Image(user_id=7, shop_id=7, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=4, shop_id=7, review_id=19, img_link='https://images.squarespace-cdn.com/content/51c8b108e4b050e44c477323/1458300253666-PYZY8NB8C5VQI848PRZ2/IMG_6193.jpg?format=1500w&content-type=image%2Fjpeg', preview_image=False),
        Image(user_id=5, shop_id=7, review_id=20, img_link='https://sprudge.com/wp-content/uploads/2014/02/sightglass-coffee-mission-roaster-probat.jpg', preview_image=False),
        Image(user_id=6, shop_id=7, review_id=21, img_link='https://images.squarespace-cdn.com/content/v1/6093287d801ee71d6155e865/1626390249722-NKRJTT2N3ED1EZ9LLJCD/SiteglassDivis_PhotoByBruceDamonte_06.jpeg', preview_image=False),
        Image(user_id=7, shop_id=7, img_link='https://media-cdn.tripadvisor.com/media/photo-s/17/e6/1d/5d/excellently-smooth-tasty.jpg', preview_image=False),
        Image(user_id=7, shop_id=7, img_link='https://media-cdn.tripadvisor.com/media/photo-s/11/76/f7/f1/photo5jpg.jpg', preview_image=False),

        # Shop 8
        Image(user_id=8, shop_id=8, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=7, shop_id=8, review_id=22, img_link='https://static01.nyt.com/images/2015/10/07/business/07peetsjpg/07peetsjpg-superJumbo.jpg', preview_image=False),
        Image(user_id=8, shop_id=8, review_id=23, img_link='https://artisti.com.au/cdn/shop/files/IMG_5845-3_1024x_f6254079-1440-4c17-b525-d856fdc73b9f_1024x.webp?v=1679902438', preview_image=False),
        Image(user_id=9, shop_id=8, review_id=24, img_link='https://assets.bonappetit.com/photos/570eb4f4ea4ae08245db6493/16:9/w_2560,c_limit/saint-frank-san-francisco-behind-counter-lead-image.jpg', preview_image=False),
        Image(user_id=8, shop_id=8, img_link='https://d1bb1mccaihlpl.cloudfront.net/variants/lk7vugl4n9f5psshwbyvrh9mc8hy/5495488087431af32265aaaaa1b8a274541d70555aa4d7c01d8d0fed27e7c152', preview_image=False),
        Image(user_id=8, shop_id=8, img_link='https://feelgoodfoodie.net/wp-content/uploads/2020/03/Whipped-Coffee-10-2.jpg', preview_image=False),

        # Shop 9
        Image(user_id=9, shop_id=9, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=10, shop_id=9, review_id=25, img_link='https://www.eatingwell.com/thmb/ekNUGKJ50lP7-p2V4B-3W2mnq_0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/coffee_960-7882dec1ea02416d830a0747eb657a2f.jpg', preview_image=False),
        Image(user_id=11, shop_id=9, review_id=26, img_link='https://images.squarespace-cdn.com/content/v1/5be4ea9b55b02cf09b6748bd/1606319596294-917T47PYG7MLBEIDZ4NO/Web_Banner_jpeg-2017_04_25_02_Hayes+Valley+Kiosk+-+F080.JPG', preview_image=False),
        Image(user_id=12, shop_id=9, review_id=27, img_link='https://images.squarespace-cdn.com/content/v1/5be4ea9b55b02cf09b6748bd/1545431394289-M7WNVYQ3RLA77UCR1XQG/vliguszakxaxcuohlksa.jpg', preview_image=False),
        Image(user_id=9, shop_id=9, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/ZQyJOenQeNnv0X1qDPZIXA/348s.jpg', preview_image=False),
        Image(user_id=9, shop_id=9, img_link='https://sprudge.com/wp-content/uploads/2016/11/Sprudge-SaintFrankAtFacebook-NoahSanders-3P3A3034-740x494.jpg', preview_image=False),

        # Shop 10
        Image(user_id=10, shop_id=10, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/IE19sZJw3i-tzhsi1EXwtg/o.jpg', preview_image=True),
        Image(user_id=13, shop_id=10, review_id=28, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/iOGF6C8CQ8tIeiHimgDiZw/348s.jpg', preview_image=False),
        Image(user_id=14, shop_id=10, review_id=29, img_link='https://www.google.com/search?sca_esv=832bfc491017b489&rlz=1C5CHFA_enUS840US842&sxsrf=ADLYWIK4uEQYnUJ4JFqPfDTxYH5d4YpAsw:1716573447076&q=home+coffee&uds=ADvngMiLMd7EL5NNlQKogBNiCnwmrXistzCUSOLeJMXz_hyZdltq-V27VOcxnY2g-jE_rHyezgGbjPZA7Xd_bRxuJHnoFbxB7Z7i6gkzmb4dic4gKgbao4V2yyVGbryTWyL84FtjzbhDirRnv5uiPqG3ql5GXXC2me1tDVLGDL3sReQavPsE3cu9ehRiwDQEE5A7shC9rb1GKFaEdAEn2qgIQsAwNYE1JNw3I0zW2uUuTX466xO1qP3xOXFSejqEFSOccAwC0erlbc-NJ878nEp78g_v8yWmEBITsCT0T4ApSvd3MX06uBEOcnbCzSlSdSMMmTKplRTd&udm=2&prmd=imvnbt&sa=X&ved=2ahUKEwjPwKy07qaGAxXhADQIHbmlBtIQtKgLegQIEhAB&biw=1525&bih=1245&dpr=2#imgrc=pITopfchToD0gM&imgdii=o44TFHnSWRORWM', preview_image=False),
        Image(user_id=15, shop_id=10, review_id=30, img_link='https://www.architecturalrecord.com/ext/resources/Issues/2019/06-June/GDGB/Blue-Bottle-Coffee/1906-GDGB-Blue-Bottle-Coffee-Various-locations-Bohlin-Cywinski-Jackson-01.jpg?height=635&t=1559067424&width=1200', preview_image=False),
        Image(user_id=10, shop_id=10, img_link='https://s3-media0.fl.yelpcdn.com/bphoto/2x7W81UeZOENZ1b0LLIjKQ/348s.jpg', preview_image=False),
        Image(user_id=10, shop_id=10, img_link='https://www.bcj.com/wp-content/uploads/2021/08/Blue-Bottle-Stanford_AR_0275_medium.jpg', preview_image=False)
    ]

    db.session.add_all(images)
    db.session.commit()

def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
