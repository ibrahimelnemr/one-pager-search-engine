from elasticsearch import Elasticsearch, exceptions as es_exceptions
from transformers import BertTokenizer, BertModel
from employees_dummy_data import data_elastic

# Connect to Elasticsearch
try:
    es = Elasticsearch(cloud_id='69308a62925f4983ad0027b5a4e54a37:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDc0OTZlN2NmYjAyNzRjYmVhMmI2ZGYwYjM0N2EwZWE2JDBjZTgzY2YwMDg5MDRjYzZiMjZkZjcyNmFmZjIxMmQy', 
                       api_key="UTI4aEtKVUJXY0otSVhDektkQm46U2dSQmFJLVJROFNSbHRDRnVKMTI4QQ==")

    if es.ping():
        print("Connected to Elasticsearch")
    else:
        print("Elasticsearch connection failed")
except es_exceptions.ConnectionError as e:
    print(f"Elasticsearch Connection Error: {e}")

# Initialize BERT model and tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

def preprocess_and_index(data):    
    for doc_id, profile in data.items():
        # Combine text fields for embedding
        text = ' '.join(profile['technical_skills'] + profile['industry_skills'] + [profile['bio']])
        
        # Tokenise and get embeddings
        inputs = tokenizer(text, return_tensors='pt')
        outputs = model(**inputs)
        embedding = outputs.last_hidden_state.mean(dim=1).squeeze().detach().numpy()
        
        # Index the profile in Elasticsearch
        try:
            es.index(index='profiles', id=doc_id, body={
                'name': profile['name'],
                'email': profile['email'],
                'technical_skills': profile['technical_skills'],
                'industry_skills': profile['industry_skills'],
                'bio': profile['bio'],
                'embedding': embedding.tolist()
            })
            print(f"Indexed profile {doc_id} successfully")
        except es_exceptions.ConnectionError as e:
            print(f"Elasticsearch Indexing Error: {e}")


def search_profiles(query):
    # Preprocess query
    inputs = tokenizer(query, return_tensors='pt')
    outputs = model(**inputs)
    query_embedding = outputs.last_hidden_state.mean(dim=1).squeeze().detach().numpy()
    
    # Search in Elasticsearch
    script_query = {
        "script_score": {
            "query": {"match_all": {}},
            "script": {
                "source": "cosineSimilarity(params.query_vector, 'embedding') + 1.0",
                "params": {"query_vector": query_embedding.tolist()}
            }
        }
    }
    
    try:
        response = es.search(index='profiles', body={"query": script_query})
        return response['hits']['hits']
    except es_exceptions.ConnectionError as e:
        print(f"Elasticsearch Search Error: {e}")
        return []


def main():
    # Ask for search input
    query = input("Enter key skills or project criteria: ")
    
    # Perform search
    results = search_profiles(query)
    
    # Print results
    for result in results:
        print(result['_source']['name'], 
              result['_source']['email'], 
              result['_score'],
              result['_source']['technical_skills']
              )
        
if __name__ == "__main__":
    preprocess_and_index(data_elastic)  # Index the data
    main()  # Run the main function