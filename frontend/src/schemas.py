from pydantic import BaseModel
from typing import List, Optional

class RecipeRequest(BaseModel):
    ingredients: List[str]

class RecipeResponse(BaseModel):
    title: str
    ingredients: str
    instructions: str
    # Add any other fields from your CSV you want to return