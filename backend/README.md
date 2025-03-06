# Setup

`cd backend`

`python -m venv venv`

`source venv/bin/activate`

(within venv) `pip install -r requirements.txt`

Then should be able to run `python app.py` to start the backend

Note: python version should be `3.12.3`

## Elastic Search

To setup elastic search locally, run 

`docker run -d --name es-local -p 9200:9200 -e "discovery.type=single-node" -e "xpack.security.enabled=false" docker.elastic.co/elasticsearch/elasticsearch:8.17.2`

Note that the elasticsearch version must be `8.17.2`
