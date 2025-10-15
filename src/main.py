from fastapi import FastAPI, HTTPException
from .core import RecipeFinder
from .schemas import RecipeRequest, RecipeResponse

app = FastAPI(
    title="Recipe Finder API",
    description="Find recipes based on ingredients you have.",
    version="1.0.0"
)

# Initialize the RecipeFinder
# The path is relative to the project root where you run the server
finder = RecipeFinder(data_path="./data/recipes.csv")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Recipe Finder API! Post to /find_recipe to get started."}


@app.post("/find_recipe", response_model=RecipeResponse)
def find_recipe(request: RecipeRequest):
    """
    Takes a list of ingredients and returns the best matching recipe.
    """
    if not request.ingredients:
        raise HTTPException(status_code=400, detail="Ingredients list cannot be empty.")
    
    best_recipe = finder.find_best_recipe(request.ingredients)
    
    if best_recipe is None:
        raise HTTPException(status_code=404, detail="No matching recipe found.")
        
    return best_recipe