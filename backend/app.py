from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from pymongo import MongoClient
from semantic_search import SemanticSearch
from elasticsearch import Elasticsearch, exceptions as es_exceptions
import os
from transformers import BertTokenizer, BertModel

app = Flask(__name__)
CORS(app) 

USE_CLOUD_ELASTICSEARCH = False

ELASTICSEARCH_HOST = os.getenv("ELASTICSEARCH_HOST", "http://localhost:9200")

def ss_setup():

    global ss

    if USE_CLOUD_ELASTICSEARCH:
        es = Elasticsearch(cloud_id='69308a62925f4983ad0027b5a4e54a37:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDc0OTZlN2NmYjAyNzRjYmVhMmI2ZGYwYjM0N2EwZWE2JDBjZTgzY2YwMDg5MDRjYzZiMjZkZjcyNmFmZjIxMmQy', 
                        api_key="UTI4aEtKVUJXY0otSVhDektkQm46U2dSQmFJLVJROFNSbHRDRnVKMTI4QQ==")
    else:
        # Connect to Local Elasticsearch
        es = Elasticsearch(ELASTICSEARCH_HOST)
        
    try:
        if es.ping():
            print("Connected to Elasticsearch")
            print(es.info())
        else:
            print("Elasticsearch connection failed")
    except es_exceptions.ConnectionError as e:
        print(f"Elasticsearch Connection Error: {e}")

    # Initialize BERT model and tokenizer
    model_directory = "./bert-base-uncased"

    # tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    tokenizer = BertTokenizer.from_pretrained(model_directory)

    # tokenizer.save_pretrained(model_directory)

    # model = BertModel.from_pretrained('bert-base-uncased')
    model = BertModel.from_pretrained(model_directory)

# model.save_pretrained(model_directory)

# Semantic search setup

    try:
        ss = SemanticSearch(USE_CLOUD_ELASTICSEARCH=False, tokenizer=tokenizer, model=model, es=es)
        print("SemanticSearch set up SUCCESSFULLY")
    except Exception as e:
        print("Error setting up semanticsearch")
        print(e)

@app.route('/')
def home():
    return "Use POST /search to find employees by skills. EDIT2"

@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    skills = data.get('skills', [])

    if not skills:
        return jsonify({'error': 'Skills list is required'}), 400

    first_skill = skills[0]  # Use only the first skill
    
    results = ss.query(first_skill)
    
    print("search() - Results obtained")
    print(jsonify(results))
    
    return jsonify(results)

if __name__ == '__main__':
    print("Server is running...")
    print("Setting up elasticsearch")
    ss_setup()
    print("Semantic Search set up successfully")

    app.run(host="0.0.0.0", port=5050, debug=True)
