
from webScrapper import scraper

if __name__ == '__main__':
    scraper.scrapCategoryLinks()
    scraper.scrapRecipesLinksFromMainCategory()
    scraper.scrapRecipeData('https://foody.co.il/foody_recipe/%d7%9c%d7%90-%d7%a6%d7%a8%d7%99%d7%9a-%d7%9c%d7%91%d7%97%d7%95%d7%a8-%d7%9c%d7%96%d7%a0%d7%99%d7%94-%d7%a2%d7%9c-%d7%91%d7%a1%d7%99%d7%a1-%d7%a1%d7%a4%d7%92%d7%98%d7%99/')