from bs4 import BeautifulSoup
import lxml
import requests

foodyCategoriesLinkPath = 'https://foody.co.il/category/%d7%9e%d7%aa%d7%9b%d7%95%d7%a0%d7%99-%d7%a2%d7%9e%d7%99%d7%9d-%d7%95%d7%a2%d7%93%d7%95%d7%aa/'
foodySubCategoryRecipesLinksPath = 'https://foody.co.il/category/%D7%9E%D7%AA%D7%9B%D7%95%D7%A0%D7%99-%D7%A2%D7%9E%D7%99%D7%9D-%D7%95%D7%A2%D7%93%D7%95%D7%AA/%D7%90%D7%95%D7%9B%D7%9C-%D7%90%D7%99%D7%98%D7%9C%D7%A7%D7%99/?page=10'


def scrapCategoryLinks():
    foodyHtmlInfo = requests.get(foodyCategoriesLinkPath)
    soup = BeautifulSoup(foodyHtmlInfo.text, 'lxml')

    foodCategoriesSection = soup.find('section', class_='details-container')
    allCategoriesLiTags = foodCategoriesSection.ul.findAll('li')
    for li in range(0, len(allCategoriesLiTags)):
        print("                         #### START CATEGORY NUMBER  " + str(li) + " ####")
        print("Category = " + allCategoriesLiTags[li].a.img['alt'].rstrip().lstrip())
        print("Catrgory Link = " + allCategoriesLiTags[li].a['href'])
        print("Image Link = " + allCategoriesLiTags[li].a.img['src'])
        scrapRecipesLinksFromMainCategory(allCategoriesLiTags[li].a['href'])
        print("                         #### END CATEGORY NUMBER  " + str(li) + " ####")


def scrapRecipesLinksFromMainCategory(categoryLink):
    recipesHtmlInfo = requests.get(categoryLink)
    soup = BeautifulSoup(recipesHtmlInfo.text, 'lxml')

    allRecipes = soup.find_all('div', class_='recipe-item feed-item')
    for i in range(0, len(allRecipes)):
        singleRecipe = allRecipes[i]
        singleRecipeHeader = singleRecipe.section
        singleRecipeLink = singleRecipeHeader.section.h2.a['href']
        singleRecipeName = singleRecipeHeader.section.h2.a.contents

        print("     #### RECIPE NUMBER " + str(i) + " ####")
        print(" Single recipe name = " + singleRecipeName[0].rstrip().lstrip())
        print(" Single recipe link = " + singleRecipeLink)
        scrapRecipeData(singleRecipeLink)
        print("     #### RECIPE NUMBER " + str(i) + " ####\n ")


def scrapRecipeData(recipeLink):
    recipeHtmlInfo = requests.get(recipeLink)
    soup = BeautifulSoup(recipeHtmlInfo.text, 'lxml')

    scrapRecipeIngredients(soup)
    scrapRecipeCategories(soup)
    # scrapRecipeGeneralInfo(soup)


def scrapRecipeIngredients(soup):
    ingredientsTags = soup.find_all('div', class_='ingredient')
    print("Recipe Ingredients: ")
    for i in range(0, len(ingredientsTags)):
        print("     IngredientName = " + ingredientsTags[i].span.span['data-singular'] + "   IngredientAmount = " +
              ingredientsTags[i].span.span['data-amount'] + "   IngredientUnitType = " + ingredientsTags[i].span.span[
                  'data-unit'])


def scrapRecipeCategories(soup):
    categoryTags = soup.find_all('a', rel='category tag')
    print("Recipe categories: ")
    for i in range(0, len(categoryTags)):
        print("     " + categoryTags[i].contents[0])


def scrapRecipeGeneralInfo(soup):
    generalInfoTags = soup.find_all('li', class_="overview-item col-sm-3 col-6")
    for string in generalInfoTags[0].stripped_strings:
        print(repr(string))
