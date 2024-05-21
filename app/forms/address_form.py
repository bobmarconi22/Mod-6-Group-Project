from flask_wtf import FlaskForm
from wtforms import StringField, StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange
from app.models import Address

class AddressForm(FlaskForm):
    name = StringField('name')
