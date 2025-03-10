from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from pymongo import MongoClient
from semantic_search import SemanticSearch
from elasticsearch import Elasticsearch, exceptions as es_exceptions
import os
import json  # Import json module
from transformers import BertTokenizer, BertModel

app = Flask(__name__)
CORS(app)

CACHE_FILE = "profiles_cache.json"  # File to store cached profiles

def load_profiles_from_cache():
    """Load profiles from the cache file if MongoDB is unavailable."""
    try:
        with open(CACHE_FILE, "r") as f:
            print("Loading profiles from cache...")
            return json.load(f)
    except FileNotFoundError:
        print("Cache file not found.")
    except json.JSONDecodeError:
        print("Cache file is corrupted.")
    
    return []  # Return empty list if cache is missing/corrupt

def save_profiles_to_cache(profiles):
    """Save profiles to a cache file."""
    try:
        with open(CACHE_FILE, "w") as f:
            json.dump(profiles, f, indent=4)
        print("Profiles saved to cache successfully.")
    except Exception as e:
        print(f"Error saving profiles to cache: {e}")

def ss_setup():
    global ss, mongo_collection, mongo_client, profiles_list

    # Elasticsearch setup

    es = Elasticsearch(cloud_id='223d9b37960f435d8e1e0c7aa5e79432:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJGJmNDA5NTIwYzM5YjRkYWZiNGZmYzAwYTA3ZjY2MzI5JGQ1MmU3OTkxYmEwZjQ3OWNiZGJmNmY5MDFmNjM3OWNm', 
                    api_key="b3ZURGZKVUJlZy11VUlNNndrZS06ZWxRSXR1bTZRUHFhRWJycldmdUlfdw==")
    
    try:
        if es.ping():
            print("✅ Connected to Elasticsearch")
        else:
            print("❌ Elasticsearch connection failed")
    except es_exceptions.ConnectionError as e:
        print(f"❌ Elasticsearch Connection Error: {e}")

    # MongoDB connection setup
    try:
        print("Setting up MongoDB...")
        mongo_client = MongoClient('mongodb+srv://dmaged:pX0YqddPVl4OqGeW@cluster1.zylou.mongodb.net/')
        db = mongo_client['one-pager-data']
        mongo_collection = db['employees']
        print("✅ MongoDB Connected SUCCESSFULLY")

        # Fetch all documents from the collection
        profiles_list = list(mongo_collection.find({}))

        # Convert ObjectId to string for JSON compatibility
        for profile in profiles_list:
            profile["_id"] = str(profile["_id"])
        
        # Save profiles to cache
        save_profiles_to_cache(profiles_list)

    except Exception as e:
        print(f"❌ Error connecting to MongoDB: {e}")
        mongo_collection = None
        print("Loading profiles from cache...")
        profiles_list = load_profiles_from_cache()  # Load from cache if MongoDB fails

    # Initialize BERT model and tokenizer
    model_directory = "./bert-base-uncased"
    tokenizer = BertTokenizer.from_pretrained(model_directory)
    model = BertModel.from_pretrained(model_directory)

    # Semantic search setup
    try:
        ss = SemanticSearch(USE_CLOUD_ELASTICSEARCH=False, tokenizer=tokenizer, model=model, es=es, data_elastic=profiles_list)
        print("✅ SemanticSearch set up SUCCESSFULLY")
    except Exception as e:
        print(f"❌ Error setting up SemanticSearch: {e}")

@app.route('/')
def home():
    return jsonify(profiles_list)

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')

    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400

    results = ss.query(query)

    print("search() - Results obtained")
    return jsonify(results)


if __name__ == '__main__':
    print("🚀 Server is starting...")
    print("🔧 Setting up Elasticsearch and MongoDB")
    ss_setup()
    print("✅ Semantic Search setup complete")

    app.run(host="0.0.0.0", port=8080, debug=True)
