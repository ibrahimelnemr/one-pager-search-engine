from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app) 

# MongoDB connection setup
client = MongoClient('mongodb+srv://dmaged:pX0YqddPVl4OqGeW@cluster1.zylou.mongodb.net/')
db = client['profile_db']
collection = db['profiles']

@app.route('/')
def home():
    return "Use POST /search to find employees by skills."

@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    skills = data.get('skills', [])

    if not skills:
        return jsonify({'error': 'Skills list is required'}), 400

    first_skill = skills[0]  # Use only the first skill
    results = collection.find({'$text': {'$search': first_skill}})

    # Extract fields the same way `_id` was extracted before
    sorted_results = sorted(results, key=lambda x: x['_id'])
    employees = [
        {
            "id": str(employee['_id']),
            "name": employee.get("name", ""),
            "bio": employee.get("bio", ""),
            "email": employee.get("email", "")
        }
        for employee in sorted_results
    ]

    return jsonify(employees)

if __name__ == '__main__':
    print("Server is running...")
    app.run(debug=True)
