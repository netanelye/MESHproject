from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func


class SearchElement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(10000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))
    elements = db.relationship('SearchElement')
    priorities = db.relationship('Priority')


class Priority(db.Model):
    priority_id = db.Column(db.Integer, primary_key=True)
    kosher = db.Column(db.Boolean())
    gluten = db.Column(db.Boolean())
    lactose = db.Column(db.Boolean())
    vegetarian = db.Column(db.Boolean())
    vegan = db.Column(db.Boolean())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


Recipe_Ingredient = db.Table('Recipe_Ingredient',
                             db.Column('recipe_id', db.Integer, db.ForeignKey('recipes.recipe_id')),
                             db.Column('Ingredient', db.Integer, db.ForeignKey('ingredient.ingredient_id')))


class Recipe(db.Model):
    __tablename__ = 'recipes'
    recipe_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    ingredients = db.relationship('Ingredient', secondary=Recipe_Ingredient,
                                  backref=db.backref('recipes', lazy='dynamic'))
   # category = db.column(db.String(150))


class Ingredient(db.Model):
    __tablename__ = 'ingredient'
    ingredient_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))




