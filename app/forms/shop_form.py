from flask_wtf import FlaskForm
from wtforms import StringField, StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange
from app.models import Shop

class ShopForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    monday_open = StringField('Monday Open')
    monday_close = StringField('Monday Close')
    tuesday_open = StringField('Tuesday Open')
    tuesday_close = StringField('Tuesday Close')
    wednesday_open = StringField('Wednesday Open')
    wednesday_close = StringField('Wednesday Close')
    thursday_open = StringField('Thursday Open')
    thursday_close = StringField('Thursday Close')
    friday_open = StringField('Friday Open')
    friday_close = StringField('Friday Close')
    saturday_open = StringField('Saturday Open')
    saturday_close = StringField('Saturday Close')
    sunday_open = StringField('Sunday Open')
    sunday_close = StringField('Sunday Close')
    website = StringField('Website', validators=[DataRequired()])
    phone_number = StringField('Phone')
    price_range = IntegerField('Price', validators=[DataRequired(), NumberRange(min=1, max=4)])
    preview_image = StringField('Preview Img')
