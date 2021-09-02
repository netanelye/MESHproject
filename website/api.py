import json
from flask import Blueprint, render_template, jsonify, request
from . import db
from .models import Recipe, Ingredient, Category, Recipe_Ingredient
from flask_login import current_user
from bs4 import BeautifulSoup
import lxml
import requests
import itertools


foodyCategoriesLinkPath = 'https://foody.co.il/category/%d7%90%d7%a8%d7%95%d7%97%d7%95%d7%aa/%d7%90%d7%a8%d7%95%d7%97%d7%94-%d7%93%d7%99%d7%90%d7%98%d7%98%d7%99%d7%aa/'
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
        scrapRecipesLinksFromMainCategory(allCategoriesLiTags[li].a['href'])


def scrapRecipesLinksFromMainCategory(categoryLink):
    recipesHtmlInfo = requests.get(categoryLink)
    soup = BeautifulSoup(recipesHtmlInfo.text, 'lxml')

    allRecipes = soup.find_all('div', class_='recipe-item feed-item')

    for i in range(0, len(allRecipes)):
        singleRecipe = allRecipes[i]
        singleRecipeHeader = singleRecipe.section
        singleRecipeLink = singleRecipeHeader.section.h2.a['href']
        singleRecipeName = singleRecipeHeader.section.h2.a.contents
        recipeDescription = singleRecipeHeader.section.div.contents[0].rstrip().lstrip()
        image = singleRecipe.a.img['data-foody-src']
        recipeName = singleRecipeName[0].rstrip().lstrip()
        exists = db.session.query(Recipe).filter_by(name=recipeName).first()
        if exists is not None:
            continue
        else:
            newRecipe = Recipe(name=recipeName, link=singleRecipeLink, imageLink=image, description=recipeDescription)
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
    ingredientsArr = [ingredient.name for j, ingredient in enumerate(Ingredient.query.all())]
    return jsonify(ingredientsArr)


@api.route('/getRecommended', methods=['GET', 'POST'])
def getRecommended():
    y = Ingredient.query.filter_by(name='מלח דק').first()
    recList = y.recipes1
    retArr = []
    resDictArray = []
    for i, recipe in enumerate(recList):
        retArr.append(recipe)
        if i == 15:
            break
    for i, recipe in enumerate(retArr):
        recipeToAdd = {
            'recipeId': recipe.recipe_id,
            'imageLink': recipe.imageLink,
            'link': recipe.link,
            "ingredients": [ingredient.name for j, ingredient in
                            enumerate(recipe.ingredients)],
            "categories": [category.categoryName for k, category in
                           enumerate(recipe.categories)],
            'name': recipe.name,
            'description': recipe.description,

        }
        resDictArray.append(recipeToAdd)

    return json.dumps(resDictArray, ensure_ascii=False).encode('utf8').decode()

# @api.route('/getRecipes2', methods=['GET', 'POST'])
# def getRecipes2():
#     ingredients = request.get_json(force=True)
#     ingredientsArr = []
#     categoriesArr = []

#     if len(ingredients.get("ingredients")) == 0:
#         return json.dumps(ingredientsArr)

#     for singleIngredient in ingredients.get("ingredients"):
#         ingredientsArr.append(singleIngredient.get('title'))

#     if ingredients.get("categories") is not None:
#         for category in ingredients.get("categories"):
#             categoriesArr.append(category)

#     ingredientsArr = sortIngredients(ingredientsArr)
#     recipesMatch = findRecipesByCategoriesAndIngredients(ingredientsArr, categoriesArr)
#     arrLength = len(ingredientsArr)
#     matchCounter = 0
#     setOfIds= set()

#     resDictArray = []
#     while len(resDictArray) < 15 and len(ingredientsArr) != 0:
#         for i, recipe in enumerate(recipesMatch):

#             number = round((arrLength - matchCounter) * 100 / arrLength, 2)
#             recipeToAdd = {
#                 'recipeId': recipe.recipe_id,
#                 'imageLink': recipe.imageLink,
#                 'link': recipe.link,
#                 "ingredients": [ingredient.name for j, ingredient in
#                                 enumerate(recipe.ingredients)],
#                 "categories": [category.categoryName for k, category in
#                                enumerate(recipe.categories)],
#                 'name': recipe.name,
#                 'description': recipe.description,
#                 'matchPrecentage': str(number) + "% התאמה למרכיבים שחיפשת"  
#             }
            
#             if recipeToAdd['recipeId'] not in setOfIds:
#                 resDictArray.append(recipeToAdd)
#                 setOfIds.add(recipeToAdd['recipeId'])

#             if len(resDictArray) == 15:
#                 break

        
#         ingredientsArr.pop()
#         matchCounter = matchCounter + 1
#         recipesMatch = findRecipesByCategoriesAndIngredients(ingredientsArr,categoriesArr)

#     return json.dumps(resDictArray, ensure_ascii=False).encode('utf8').decode()

# def getPowerSet(ingredientsArr):
#     resultArr = []
#     for i in range(1, len(ingredientsArr) + 1):
#         for subset in itertools.combinations(ingredientsArr, i):
#             resultArr.append(list(subset))

#     return resultArr

def getPowerSet(ingredientsArr):
    resultArr = []
    for i in range(1, len(ingredientsArr) + 1):
        for subset in itertools.combinations(ingredientsArr, i):
            resultArr.append(list(subset))

    return resultArr

@api.route('/getRecipes', methods=['GET', 'POST'])
def getRecipes():
    ingredients = request.get_json(force=True)
    ingredientsArr = []
    categoriesArr = []

    if len(ingredients.get("ingredients")) == 0:
        return json.dumps(ingredientsArr)

    for singleIngredient in ingredients.get("ingredients"):
        ingredientsArr.append(singleIngredient.get('title'))

    if ingredients.get("categories") is not None:
        for category in ingredients.get("categories"):
            categoriesArr.append(category)

    listOfPermute = getPowerSet(ingredientsArr)

    recipesMatch = findRecipesByCategoriesAndIngredients(ingredientsArr, categoriesArr)
    arrLength = len(ingredientsArr)
    currLength = len(ingredientsArr)
    matchCounter = 0
    setOfIds = set()
    resDictArray = []
    while len(resDictArray) < 15 and len(ingredientsArr) != 0:
        for i, recipe in enumerate(recipesMatch):
            precentage = (arrLength - matchCounter) * 100 / arrLength
            precentage = round(precentage, 2)
            recipeToAdd = {
                'recipeId': recipe.recipe_id,
                'imageLink': recipe.imageLink,
                'link': recipe.link,
                "ingredients": [ingredient.name for j, ingredient in
                                enumerate(recipe.ingredients)],
                "categories": [category.categoryName for k, category in
                               enumerate(recipe.categories)],
                'name': recipe.name,
                'description': recipe.description,
                'matchPrecentage': str(precentage) + "% התאמה לחיפוש שלך",
            }

            if recipeToAdd['recipeId'] not in setOfIds:
                resDictArray.append(recipeToAdd)
                setOfIds.add(recipeToAdd['recipeId'])
            if len(resDictArray) == 15:
                break

        if len(listOfPermute) != 0:
            listOfPermute.pop()
        else:
            break
        if len(listOfPermute) != 0:
            if len(listOfPermute[-1]) < currLength:
                matchCounter = matchCounter + 1
                currLength = currLength - 1
            recipesMatch = findRecipesByCategoriesAndIngredients(listOfPermute[-1], categoriesArr)
    return json.dumps(resDictArray, ensure_ascii=False).encode('utf8').decode()


@api.route('/getRecipesByCategory', methods=['GET', 'POST'])
def getRecipesByCategory():
    recipesMatch = findRecipesBycategories(['ארוחה זולה'])
    resDictArray = []
    for i, recipe in enumerate(recipesMatch):
        recipeToAdd = {'recipe': {
            'recipeId': recipe.recipe_id,
            'imageLink': recipe.imageLink,
            'link': recipe.link,
            "ingredients": [ingredient.name for j, ingredient in
                            enumerate(recipe.ingredients)],
            "categories": [category.categoryName for k, category in
                           enumerate(recipe.categories)],
            'name': recipe.name,
            'description': recipe.description

        }}
        resDictArray.append(recipeToAdd)

    return jsonify(resDictArray)


@api.route('/getdata', methods=['GET', 'POST'])
def database():
    #buildDB()
    return render_template("database.html", user=current_user, query=Recipe.query.all(), query2=Ingredient.query.all()
                           , query3=Category.query.all())


def findRecipesByIngredientsNames(IngredientsArr):
    y = Ingredient.query.filter_by(name=IngredientsArr[0]).first()
    setList = set(y.recipes1)
    for i in range(1, len(IngredientsArr)):
        ingredient = Ingredient.query.filter_by(name=IngredientsArr[i]).first()
        setList = setList.intersection(set(ingredient.recipes1))

    return setList


def findRecipesBycategories(categoriesArr):
    y = Category.query.filter_by(categoryName=(categoriesArr[0])).first()
    setList = set(y.recipes1)
    for i in range(1, len(categoriesArr)):
        category = Category.query.filter_by(categoryName=categoriesArr[i]).first()
        setList = setList.intersection(set(category.recipes1))

    return setList


def findRecipesByCategoriesAndIngredients(IngredientsArr, categoriesArr):
    if len(IngredientsArr) == 0:
        return {}
    categoriesArr = convertCategories(categoriesArr)
    setOfRecipesByIngredients = findRecipesByIngredientsNames(IngredientsArr)

    if len(categoriesArr) != 0:
        setOfRecipesByCategory = findRecipesBycategories(categoriesArr)
        return setOfRecipesByCategory.intersection(setOfRecipesByIngredients)

    return setOfRecipesByIngredients


def sortIngredients(IngredientsArr):
    dict = {}
    resList = []
    y = Ingredient.query.filter_by(name=IngredientsArr[0]).first()
    num = len(y.recipes1)
    dict[IngredientsArr[0]] = num

    for i in range(1, len(IngredientsArr)):
        y = Ingredient.query.filter_by(name=IngredientsArr[i]).first()
        num = len(y.recipes1)
        dict[IngredientsArr[i]] = num
    sort_orders = sorted(dict.items(), key=lambda x: x[1], reverse=True)

    for name in sort_orders:
        resList.append(name[0])

    return resList


def convertCategories(arr):
    resArr = []
    categoryMap = {'משהו לבוהוריים': 'בראנץ',
                   'משהו חגיגי': 'ארוחה חגיגית',
                   'משהו מהיר': 'ארוחה מהירה',
                   'משהו לשישי': 'ארוחת שישי בערב',
                   'משהו מושחת': 'ארוחה מושחתת',
                   'משהו מתוק': 'קינוחים',
                   'משהו בריא': 'ארוחה בריאה',
                   'משהו איטלקי': 'אוכל איטלקי',
                   'משהו מרוקאי': 'אוכל מרוקאי',
                   'משהו אמריקאי': 'אוכל אמריקאי',
                   'משהו בלקני': 'אוכל בלקני',
                   'משהו תאילנדי': 'אוכל תאילנדי',
                   'משהו תימני': 'אוכל תימני',
                   'בשרי': 'ארוחה בשרית',
                   'חלבי': 'ארוחה חלבית',
                   'צמחוני': 'מתכונים צמחוניים',
                   'טבעוני': 'מתכונים טבעוניים',
                   'כשר': '',
                   'ללא גלוטן': 'מתכונים ללא גלוטן',
                   'ללא לקטוז': 'מתכונים ללא לקטוז',
                   }

    for category in arr:
        resArr.append(categoryMap[category])

    return resArr


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
