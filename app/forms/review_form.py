from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, StringField
from wtforms.validators import DataRequired, NumberRange


class ReviewForm(FlaskForm):
    rating = IntegerField('Rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
    review = TextAreaField('Review', validators=[DataRequired()])
    img_url1 = StringField('Image 1')
    img_url2 = StringField('Image 2')
    img_url3 = StringField('Image 3')
