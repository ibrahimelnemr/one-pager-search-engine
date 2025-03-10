from elasticsearch import Elasticsearch, exceptions as es_exceptions
from transformers import BertTokenizer, BertModel
import torch
import numpy as np
import os

class SemanticSearch:

    def __init__(self, USE_CLOUD_ELASTICSEARCH, tokenizer, model, es, data_elastic):
        self.USE_CLOUD_ELASTICSEARCH = USE_CLOUD_ELASTICSEARCH
        self.tokenizer = tokenizer
        self.model = model
        self.es = es
        self.data_elastic = data_elastic

        self.clear_documents()
        self.create_index()
        self.preprocess_and_index(data_elastic)

    def clear_documents(self):
        try:
            self.es.delete_by_query(index="profiles", body={"query": {"match_all": {}}})
            print("All documents deleted from Elasticsearch")
        except es_exceptions.ConnectionError as e:
            print(f"Error clearing documents: {e}")
        
    def preprocess_and_index(self, data):    
        for profile in data:
            doc_email = profile['email']

            # Assign weights to different fields
            skills_text = profile['technologySkills']
            industry_text = profile['industryExperience']
            summaryOfProfessionalExperience = profile['summaryOfProfessionalExperience']

            combined_text = f"{skills_text} {industry_text} {summaryOfProfessionalExperience}"

            # Tokenize and get embeddings
            inputs = self.tokenizer(combined_text, return_tensors='pt', truncation=True, padding=True)
            outputs = self.model(**inputs)
            embedding = outputs.last_hidden_state.mean(dim=1).squeeze().detach().numpy()

            # Index the profile in Elasticsearch
            try:
                self.es.index(index='profiles', id=doc_email, body={
                    'name': profile['name'],
                    'email': profile['email'],
                    'technologySkills': profile['technologySkills'],
                    'industryExperience': profile['industryExperience'],
                    'summaryOfProfessionalExperience': profile['summaryOfProfessionalExperience'],
                    'profileImage': profile['profileImage'],
                    'officialTitle': profile['officialTitle'],
                    'title': profile['title'],
                    'costCenter': profile['costCenter'],
                    'businessSkills': profile['businessSkills'],
                    'dpnProfileLink': profile['dpnProfileLink'],
                    'embedding': embedding.tolist()
                })
                print(f"Indexed profile {doc_email} successfully")
            except es_exceptions.ConnectionError as e:
                print(f"Elasticsearch Indexing Error: {e}")

    def create_index(self):
        mapping = {
            "mappings": {
                "properties": {
                    "name": {"type": "text"},
                    "email": {"type": "keyword"},
                    "technologySkills": {"type": "text"},
                    "industryExperience": {"type": "text"},
                    "summaryOfProfessionalExperience": {"type": "text"},
                    "embedding": {
                        "type": "dense_vector",
                        "dims": 768  # Ensure it matches BERT embedding size
                    }
                }
            }
        }

        try:
            if not self.es.indices.exists(index="profiles"):
                self.es.indices.delete(index="profiles")  # Delete the index first
                print("Old index deleted")

                self.es.indices.create(index="profiles", body=mapping)
                print("Index created successfully")
            else:
                print("Index already exists")
        except es_exceptions.ConnectionError as e:
            print(f"Elasticsearch Index Creation Error: {e}")

    
    def search_profiles(self, query):
        # Preprocess query
        inputs = self.tokenizer(query, return_tensors='pt', truncation=True, padding=True)
        outputs = self.model(**inputs)
        query_embedding = outputs.last_hidden_state.mean(dim=1).squeeze().detach().numpy()

        # Use kNN search instead of match_all
        knn_query = {
            "knn": {
                "field": "embedding",
                "query_vector": query_embedding.tolist(),
                "k": 5,  # Return top 5 results
                "num_candidates": 100  # Increases recall accuracy
            }
        }

        try:
            response = self.es.search(index='profiles', body={"query": knn_query})
            return response['hits']['hits']
        except es_exceptions.ConnectionError as e:
            print(f"Elasticsearch Search Error: {e}")
            return []
        
    def query(self, query):
        results = self.search_profiles(query)
        for result in results:
            print(result['_source']['name'], 
                    result['_source']['email'], 
                    result['_score'])
        
        results_obj = []
        
        for result in results:
            # print(result['_source'])
            results_obj.append({
                "name": result['_source']['name'],
                "email": result['_source']['email'],
                "score": result['_score'],
                "technologySkills": result['_source']['technologySkills'],
                "industryExperience": result['_source']['industryExperience'],
                "summaryOfProfessionalExperience": result['_source']['summaryOfProfessionalExperience'],
                "profileImage": result['_source']['profileImage'],
                "officialTitle": result['_source']['officialTitle'],
                "title": result['_source']['title'],
                "costCenter": result['_source']['costCenter'],
                "businessSkills": result['_source']['businessSkills'],
                "dpnProfileLink": result['_source']['dpnProfileLink'],
            })
        
        return results_obj


def main():

    ss = SemanticSearch(USE_CLOUD_ELASTICSEARCH=False)

    ss.query("Android app developer")

if __name__ == '__main__':
    main()