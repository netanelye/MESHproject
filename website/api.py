import json

from flask import Blueprint, render_template, jsonify
from . import db
from .models import Recipe, Ingredient, Category, Recipe_Ingredient
from flask_login import current_user

from bs4 import BeautifulSoup
import lxml
import requests

foodyCategoriesLinkPath = 'https://foody.co.il/category/%d7%9e%d7%aa%d7%9b%d7%95%d7%a0%d7%99-%d7%a2%d7%9e%d7%99%d7%9d' \
                          '-%d7%95%d7%a2%d7%93%d7%95%d7%aa/ '
foodySubCategoryRecipesLinksPath = 'https://foody.co.il/category/%D7%9E%D7%AA%D7%9B%D7%95%D7%A0%D7%99-%D7%A2%D7%9E%D7' \
                                   '%99%D7%9D-%D7%95%D7%A2%D7%93%D7%95%D7%AA/%D7%90%D7%95%D7%9B%D7%9C-%D7%90%D7%99%D7' \
                                   '%98%D7%9C%D7%A7%D7%99/?page=10 '

api = Blueprint('api', __name__, url_prefix='/api')


def buildDB():
    foodyHtmlInfo = requests.get(foodyCategoriesLinkPath)
    soup = BeautifulSoup(foodyHtmlInfo.text, 'lxml')

    foodCategoriesSection = soup.find('section', class_='details-container')
    allCategoriesLiTags = foodCategoriesSection.ul.findAll('li')
    for li in range(0, len(allCategoriesLiTags)):
        image = allCategoriesLiTags[li].a.img['src']
        scrapRecipesLinksFromMainCategory(allCategoriesLiTags[li].a['href'], image)


def scrapRecipesLinksFromMainCategory(categoryLink, image):
    recipesHtmlInfo = requests.get(categoryLink)
    soup = BeautifulSoup(recipesHtmlInfo.text, 'lxml')

    allRecipes = soup.find_all('div', class_='recipe-item feed-item')
    for i in range(0, len(allRecipes)):
        singleRecipe = allRecipes[i]
        singleRecipeHeader = singleRecipe.section
        singleRecipeLink = singleRecipeHeader.section.h2.a['href']
        singleRecipeName = singleRecipeHeader.section.h2.a.contents
        recipeName = singleRecipeName[0].rstrip().lstrip()
        exists = db.session.query(Recipe).filter_by(name=recipeName).first()
        if exists is not None:
            continue
        else:
            newRecipe = Recipe(name=recipeName, link=singleRecipeLink, imageLink=image)
            db.session.add(newRecipe)
            db.session.commit()
            ingreds = scrapRecipeData(singleRecipeLink)
            for singleIng in ingreds:
                exists = db.session.query(Ingredient).filter_by(name=singleIng).first()
                if exists is None:
                    ingredient1 = Ingredient(name=singleIng)
                else:
                    ingredient1 = exists
                db.session.add(ingredient1)
                db.session.commit()
                ingredient1.recipes.append(newRecipe)
                db.session.commit()

            categories = scrapRecipeCategories(singleRecipeLink)
            for singleCategory in categories:
                exists = db.session.query(Category).filter_by(categoryName=singleCategory).first()
                if exists is None:
                    Category1 = Category(categoryName=singleCategory)
                else:
                    Category1 = exists
                db.session.add(Category1)
                db.session.commit()
                Category1.recipes.append(newRecipe)
                db.session.commit()

        # if i == 5:
        #     break

        # print("     #### RECIPE NUMBER " + str(i) + " ####\n ")


def scrapRecipeData(recipeLink):
    ingredients = []
    recipeHtmlInfo = requests.get(recipeLink)
    soup = BeautifulSoup(recipeHtmlInfo.text, 'lxml')

    ingredientsTags = soup.find_all('span', class_='ingredient-container')
    for i in range(0, len(ingredientsTags)):
        str1 = ingredientsTags[i].span['data-singular']
        if str1 is not None:
            ingredients.append(ingredientsTags[i].span['data-singular'])
    return ingredients


def scrapRecipeCategories(recipeLink):
    recipeHtmlInfo = requests.get(recipeLink)
    soup = BeautifulSoup(recipeHtmlInfo.text, 'lxml')
    categoryArr = []
    categoryTags = soup.find_all('a', rel='category tag')
    for i in range(0, len(categoryTags)):
        categoryArr.append(categoryTags[i].contents[0])
    return categoryArr


# The function returns json object of Ingredients : {'name1: 'onion', 'name2':'carrot'}
@api.route('/getIngredientList', methods=['GET', 'POST'])
def getIngredients():
    ingredientsArr = {'name{}'.format(j): ingredient.name for j, ingredient in enumerate(Ingredient.query.all())}
    return jsonify(ingredientsArr)


# The function returns json object of Recipes after Match :
# json example:
# recipe0 {
#     'name' : 'מתכון להכנת פיצה'
#     'link' : 'link for foody website recipe
#     'imageLink : 'link for image'
#     'ingredients' : {
#                       'name0' : 'onion'
#                       'name1' : 'salt'
#                     }
#     'categories' : {
#                       'name0' : 'kosher'
#                       'name1' : 'vegan'
#                    }
# }
# recipe1{ .......
@api.route('/getRecipes', methods=['GET', 'POST'])
def getRecipes():
    recipesMatch = findRecipesByIngredientsNames(['מלח דק', 'שום'])
    resDictArray = []
    for i, recipe in enumerate(recipesMatch):
        recipeToAdd = {'recipe': {
            'recipeId': recipe.recipe_id,
            'imageLink': recipe.imageLink,
            'image': recipe.link,
            "ingredients": [ingredient.name for j, ingredient in
                            enumerate(recipe.ingredients)],
            "categories": [category.categoryName for k, category in
                           enumerate(recipe.categories)],
            'name': recipe.name
        }}
        resDictArray.append(recipeToAdd)

    return jsonify(resDictArray)


@api.route('/getdata', methods=['GET', 'POST'])
def database():
    return render_template("database.html", user=current_user, query=Recipe.query.all(), query2=Ingredient.query.all()
                           , query3=Category.query.all())


def findRecipesByIngredientsNames(IngredientsArr):
    y = Ingredient.query.filter_by(name=IngredientsArr[0]).first()
    setList = set(y.recipes1)
    for i in range(1, len(IngredientsArr)):
        ingredient = Ingredient.query.filter_by(name=IngredientsArr[i]).first()
        setList = setList.intersection(set(ingredient.recipes1))

    return setList


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
