# Overview

# Test locally

To test backend locally

`cd backend`

`cd bert-base-uncased`

`wget -O pytorch_model.bin 'https://huggingface.co/google-bert/bert-base-uncased/resolve/main/pytorch_model.bin?download=true'`

`cd ..`

`source venv/bin/activate`

`pip install -r requirements.txt`

`python app.py`

# Setup



## 1 - Build docker images

For docker

`cd frontend`

`docker build -t ibrahimelnemr/one-pager-search-engine-frontend:latest .`

`cd backend`

`docker build -t ibrahimelnemr/one-pager-search-engine-backend:latest .`


this should build each image. 

## 2 - Run docker images

now run the images as follows

elastic search
```
docker run --name elasticsearch-one-pager -p 9200:9200 -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
  -e "xpack.security.enabled=false" \
  docker.elastic.co/elasticsearch/elasticsearch:8.17.2
```

get the elasticsearch host as this will be passed to the backend as a env variable. if running locally, will be running on the default host `localhost`

backend

`cd backend`

(note: replace `<localhost>` with actual elastic host deployment url)

```
docker run -p 5050:5000 \
  -v "$(pwd)":/app \
  -e FLASK_ENV=development \
  -e ELASTICSEARCH_HOST=http://localhost:9200 \
  --name one-pager-search-engine-backend \
  ibrahimelnemr/one-pager-search-engine-backend:latest
```

frontend

`cd frontend`

```
docker run -p 3000:3000 -e BACKEND_URL=http://localhost:5050 --name one-pager-search-engine-frontend ibrahimelnemr/one-pager-search-engine-frontend:latest
```

## 3 - Push images to docker registry

`docker login`

`cd backend`

`docker build -t ibrahimelnemr/one-pager-search-engine-backend:latest .`

`docker push ibrahimelnemr/one-pager-search-engine-backend:latest`

`cd frontend`

`docker build -t ibrahimelnemr/one-pager-search-engine-frontend:latest .`

`docker push ibrahimelnemr/one-pager-search-engine-frontend:latest`

## 4 - deploy to GCP

`gcloud auth login`

use link in browser to login; if gcloud is not installed, install with snap

`gcloud config set project <your-gcp-project-id>`

`gcloud services enable run.googleapis.com containerregistry.googleapis.com`

`docker tag ibrahimelnemr/one-pager-search-engine-backend gcr.io/<your-gcp-project-id>/backend`

`docker tag ibrahimelnemr/one-pager-search-engine-frontend gcr.io/<your-gcp-project-id>/frontend`

`docker tag docker.elastic.co/elasticsearch/elasticsearch:8.17.2 gcr.io/<your-gcp-project-id>/elasticsearch`

`docker push gcr.io/<your-gcp-project-id>/backend`

`docker push gcr.io/<your-gcp-project-id>/frontend`

`docker push gcr.io/<your-gcp-project-id>/elasticsearch`



`gcloud run deploy backend --image gcr.io/<your-gcp-project-id>/backend --platform managed --region us-central1 --allow-unauthenticated --set-env-vars "FLASK_ENV=development,ELASTICSEARCH_HOST=http://elasticsearch:9200"`

`gcloud run deploy frontend --image gcr.io/<your-gcp-project-id>/frontend --platform managed --region us-central1 --allow-unauthenticated --set-env-vars "BACKEND_URL=http://backend:5050"`

`gcloud run deploy elasticsearch --image gcr.io/<your-gcp-project-id>/elasticsearch --platform managed --region us-central1 --allow-unauthenticated`