from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from pymongo import MongoClient
from semantic_search import SemanticSearch

app = Flask(__name__)
CORS(app) 

# Semantic search setup
ss = SemanticSearch(USE_CLOUD_ELASTICSEARCH=False)

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
    
    return jsonify(results)

if __name__ == '__main__':
    print("Server is running...")
    app.run(host="0.0.0.0", port=5000, debug=True)
