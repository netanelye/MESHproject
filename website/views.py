import json
from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from . import db
from .models import SearchElement

views = Blueprint('views', __name__)


@views.route('/', methods=['GET', 'POST'])
@login_required
def home():
    return render_template("home.html", user=current_user)


@views.route('/search', methods=['GET', 'POST'])
@login_required
def main_page():
    if request.method == 'POST':
        searchElement = request.form.get('searchElement')
        if len(searchElement) < 1:
            flash('Element is too short!', category='error')
        else:
            new_element = SearchElement(data=searchElement, user_id=current_user.id)
            db.session.add(new_element)
            db.session.commit()
            flash('Element added!', category='success')
    return render_template("searchElements.html", user=current_user)


@views.route('/delete-search', methods=['post'])
def delete_note():
    searchElement = json.loads(request.data)
    searchElementId = searchElement['searchID']
    searchElement = SearchElement.query.get(searchElementId)
    if searchElement:
        if searchElement.user_id == current_user.id:
            db.session.delete(searchElement)
            db.session.commit()
    return jsonify({})


# @views.route('/showRecipes', methods=['post'])
# def delete_note():
#     searchElement = json.loads(request.data)
#     searchElementId = searchElement['searchID']
#     searchElement = SearchElement.query.get(searchElementId)
#     if searchElement:
#         if searchElement.user_id == current_user.id:
#             db.session.delete(searchElement)
#             db.session.commit()
#     return jsonify({})
