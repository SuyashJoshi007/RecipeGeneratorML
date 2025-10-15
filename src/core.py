import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re

class RecipeFinder:
    def __init__(self, data_path):
        self.df = pd.read_csv(data_path)
        # Preprocess ingredients: join list items into a single string
        self.df['ingredients_str'] = self.df['ingredients'].apply(self._preprocess)
        self.tfidf_vectorizer = TfidfVectorizer(stop_words='english')
        self.tfidf_matrix = self.tfidf_vectorizer.fit_transform(self.df['ingredients_str'])

    def _preprocess(self, ingredients):
        # Cleans and joins the ingredients string
        # Assuming ingredients are in a string format like '["item1", "item2"]'
        # This might need adjustment based on your CSV format
        ingredients = re.sub(r'[\[\]\'"]', '', ingredients)
        return ingredients.replace(',', ' ')

    def find_best_recipe(self, user_ingredients_list):
        # Process user ingredients into a single string
        user_ingredients_str = ' '.join(user_ingredients_list)
        
        # Transform the user's ingredients into a TF-IDF vector
        user_tfidf_vector = self.tfidf_vectorizer.transform([user_ingredients_str])
        
        # Calculate cosine similarity between user's ingredients and all recipes
        cosine_similarities = cosine_similarity(user_tfidf_vector, self.tfidf_matrix).flatten()
        
        # Find the index of the most similar recipe
        best_match_index = cosine_similarities.argmax()
        
        # Get the highest similarity score
        highest_score = cosine_similarities[best_match_index]
        
        # If the best score is 0, it means no ingredients matched.
        if highest_score == 0:
            return None
            
        # Return the best matching recipe as a dictionary
        best_recipe = self.df.iloc[best_match_index]
        return best_recipe.to_dict()

# Example usage (you can test this directly)
if __name__ == '__main__':
    finder = RecipeFinder(data_path='../data/recipes.csv')
    my_ingredients = ['chicken', 'rice', 'onion']
    recipe = finder.find_best_recipe(my_ingredients)
    if recipe:
        print(f"Found Recipe: {recipe['title']}")
        print(f"Ingredients: {recipe['ingredients']}")
    else:
        print("No matching recipe found.")