from flask_wtf import FlaskForm
from wtforms import StringField, StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange
from app.models import Address

class AddressForm(FlaskForm):
    address_line1 = StringField('Address Line 1', validators=[DataRequired()])
    address_line2 = StringField('Address Line 2')
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    country = StringField('Country', validators=[DataRequired()])
    postal_code = StringField('Postal Code', validators=[DataRequired()])
