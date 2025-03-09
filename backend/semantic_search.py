from elasticsearch import Elasticsearch, exceptions as es_exceptions
from transformers import BertTokenizer, BertModel
import torch
import numpy as np
import os

data_elastic = [
        {
            '_id': 'doc3',
            'name': 'Alice Johnson',
            'email': 'alice@example.com',
            'technical_skills': ['C++', 'C#', '.NET'],
            'industry_skills': ['Gaming', 'Software Development'],
            'bio': 'Software engineer with a strong background in gaming and software development.'
        },
        {
            '_id': 'doc5',
            'name': 'Charlie Davis',
            'email': 'charlie@example.com',
            'technical_skills': ['PHP', 'Laravel', 'MySQL'],
            'industry_skills': ['Web Development', 'Marketing'],
            'bio': 'Web developer specializing in PHP and Laravel, with experience in marketing.'
        },
        {
            '_id': 'doc9',
            'name': 'George Harris',
            'email': 'george@example.com',
            'technical_skills': ['Go', 'Kubernetes', 'Docker'],
            'industry_skills': ['Cloud Computing', 'DevOps'],
            'bio': 'DevOps engineer with expertise in Go, Kubernetes, and Docker, focusing on cloud computing.'
        },
        {
            '_id': 'doc10',
            'name': 'Hannah White',
            'email': 'hannah@example.com',
            'technical_skills': ['HTML', 'CSS', 'JavaScript', 'Vue.js'],
            'industry_skills': ['Web Development', 'Design'],
            'bio': 'Front-end developer and designer with a passion for creating beautiful web experiences.'
        },
        {
            '_id': 'doc4',
            'name': 'Bob Brown',
            'email': 'bob@example.com',
            'technical_skills': ['Ruby', 'Rails', 'JavaScript'],
            'industry_skills': ['Education', 'Startups'],
            'bio': 'Full-stack developer with a passion for building educational platforms and startups.'
        },
        {
            '_id': 'doc6',
            'name': 'Diana Evans',
            'email': 'diana@example.com',
            'technical_skills': ['Python', 'Machine Learning', 'TensorFlow'],
            'industry_skills': ['Healthcare', 'Research'],
            'bio': 'Machine learning engineer with a focus on healthcare applications and research.'
        },
        {
            '_id': 'doc7',
            'name': 'Ethan Foster',
            'email': 'ethan@example.com',
            'technical_skills': ['JavaScript', 'React', 'Node.js'],
            'industry_skills': ['Finance', 'Fintech'],
            'bio': 'Front-end developer with expertise in React and Node.js, working primarily in fintech.'
        },
        {
            '_id': 'doc8',
            'name': 'Fiona Green',
            'email': 'fiona@example.com',
            'technical_skills': ['Swift', 'Objective-C', 'iOS Development'],
            'industry_skills': ['Mobile Development', 'Entertainment'],
            'bio': 'iOS developer with a strong background in mobile development and entertainment applications.'
        },
        {
            '_id': 'doc2',
            'name': 'Jane Smith',
            'email': 'jane@example.com',
            'technical_skills': ['Java', 'Spring', 'Hibernate'],
            'industry_skills': ['E-commerce', 'Retail'],
            'bio': 'Senior Java developer with extensive experience in e-commerce and retail systems.'
        },
        {
            '_id': 'doc1',
            'name': 'John Doe',
            'email': 'john@example.com',
            'technical_skills': ['Python', 'JavaScript'],
            'industry_skills': ['Finance', 'Healthcare'],
            'bio': 'Experienced software developer with a background in finance and healthcare technology.'
        }
    ]

class SemanticSearch:

    def __init__(self, USE_CLOUD_ELASTICSEARCH, tokenizer, model, es):
        self.USE_CLOUD_ELASTICSEARCH = USE_CLOUD_ELASTICSEARCH
        self.tokenizer = tokenizer
        self.model = model
        self.es = es

        self.create_index()
        self.preprocess_and_index(data_elastic)


    def preprocess_and_index(self, data):    
        for profile in data:
            doc_id = profile['_id']

            # Assign weights to different fields
            skills_text = ' '.join(profile['technical_skills'] * 3)  # Give more weight to skills
            industry_text = ' '.join(profile['industry_skills'] * 2)
            bio_text = profile['bio']

            combined_text = f"{skills_text} {industry_text} {bio_text}"

            # Tokenize and get embeddings
            inputs = self.tokenizer(combined_text, return_tensors='pt', truncation=True, padding=True)
            outputs = self.model(**inputs)
            embedding = outputs.last_hidden_state.mean(dim=1).squeeze().detach().numpy()

            # Index the profile in Elasticsearch
            try:
                self.es.index(index='profiles', id=doc_id, body={
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

    def create_index(self):
        mapping = {
            "mappings": {
                "properties": {
                    "name": {"type": "text"},
                    "email": {"type": "keyword"},
                    "technical_skills": {"type": "text"},
                    "industry_skills": {"type": "text"},
                    "bio": {"type": "text"},
                    "embedding": {
                        "type": "dense_vector",
                        "dims": 768  # Ensure it matches BERT embedding size
                    }
                }
            }
        }

        try:
            if not self.es.indices.exists(index="profiles"):
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
                    result['_score'],
                    result['_source']['technical_skills'])
        
        results_obj = []
        
        for result in results:
            results_obj.append({
                "name": result['_source']['name'],
                "email": result['_source']['email'],
                "score": result['_score'],
                "technical_skills": result['_source']['technical_skills']
            })
        
        return results_obj


def main():

    ss = SemanticSearch(USE_CLOUD_ELASTICSEARCH=False)

    ss.query("Android app developer")

if __name__ == '__main__':
    main()