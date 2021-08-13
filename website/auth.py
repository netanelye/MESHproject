from flask import Blueprint, render_template, request, flash, redirect, url_for
from . import db
from .models import User, Priority, Recipe, Ingredient
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, current_user, login_required

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                flash('Logged in successfully!', category='success')
                login_user(user, remember=True)
                return redirect(url_for('views.home'))
            else:
                flash('Incorrect password, try again.', category='error')
        else:
            flash('Email not exists', category='error')
    return render_template("login.html", user=current_user)


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))


@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email')
        first_name = request.form.get('name')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')
        kosher = request.form.get('kosher') is not None
        gluten = request.form.get('gluten') is not None
        lactose = request.form.get('lactose') is not None
        vegetarian = request.form.get('vegetarian') is not None
        vegan = request.form.get('vegan') is not None
        # priorityList = request.form.getlist('priority')
        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email already exists', category='error')
        elif len(email) < 4:
            flash('Email must greater than 4 chars.', category='error')
        elif len(first_name) < 2:
            flash('First name must be greater than 1 char.', category='error')
        elif password1 != password2:
            flash('password don\'t match.', category='error')
        elif len(password1) < 7:
            flash('Password must be at least 7 chars.', category='error')
        else:
            new_user = User(email=email, first_name=first_name,
                            password=generate_password_hash(password1, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            flash('Account created!', category='success')
            priority = Priority(kosher=kosher, gluten=gluten, lactose=lactose, vegetarian=vegetarian, vegan=vegan,
                                user_id=current_user.id)
            db.session.add(priority)
            db.session.commit()
            print(Priority.query.all())
            return redirect(url_for('views.home'))

    return render_template("sign_up.html", user=current_user)


# @auth.route('/update', methods=['GET', 'POST'])
# @login_required
# def update():


@auth.route('/database', methods=['GET', 'POST'])
def database():
    initTable()
    return render_template("database.html", user=current_user, query=Recipe.query.all(), query2=Ingredient.query.all())


def initTable():
    recipe1 = Recipe(name='pizza')
    recipe2 = Recipe(name='burger')
    recipe3 = Recipe(name='Cake')
    db.session.add(recipe1)
    db.session.add(recipe2)
    db.session.add(recipe3)
    db.session.commit()
    ingredient1 = Ingredient(name='onion')
    ingredient2 = Ingredient(name='garlic')
    ingredient3 = Ingredient(name='tomato')
    ingredient4 = Ingredient(name='cheese')
    db.session.add(ingredient1)
    db.session.add(ingredient2)
    db.session.add(ingredient3)
    db.session.add(ingredient4)
    db.session.commit()
    ingredient1.recipes.append(recipe1)
    ingredient1.recipes.append(recipe2)
    ingredient1.recipes.append(recipe3)
    ingredient2.recipes.append(recipe1)
    ingredient3.recipes.append(recipe3)
    ingredient3.recipes.append(recipe3)
    db.session.commit()
