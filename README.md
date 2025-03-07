# Overview


# Setup

For docker

`cd frontend`

`docker build -t ibrahimelnemr/one-pager-search-engine-frontend:latest .`

`cd backend`

`docker build -t ibrahimelnemr/one-pager-search-engine-backend:latest .`


this should build each image. 

now run the images as follows

elastic search
```
docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
  -e "xpack.security.enabled=false" \
  docker.elastic.co/elasticsearch/elasticsearch:8.17.2
```

get the elasticsearch host as this will be passed to the backend as a env variable

backend

`cd backend`

(note: replace `<localhost>` with actual elastic host deployment url)

`ELASTICSEARCH_HOST=http://localhost:9200 docker compose up -d`

or 
```
docker run -p 5050:5000 \
  -v "$(pwd)":/app \
  -e FLASK_ENV=development \
  -e ELASTICSEARCH_HOST=<http://localhost:9200> \
  --name one-pager-search-engine-backend \
  ibrahimelnemr/one-pager-search-engine-backend:latest
```

frontend

`cd frontend`

`docker run -p 3000:3000 --name one-pager-search-engine-frontend -e BACKEND_URL=http://localhost:5050 ibrahimelnemr/one-pager-search-engine-frontend:latest`





# Overview


# Setup

`docker login`

`docker pull ibrahimelnemr/one-pager-search-engine-backend:latest`

`docker pull ibrahimelnemr/one-pager-search-engine-frontend:latest`

`docker images`

to run either image 
`cd backend`
`docker-compose up -d`

or
`cd frontend`
`docker-compose up -d`

then to push changes to the registry

# Rebuild the backend image
`docker build -t ibrahimelnemr/one-pager-search-engine-backend:latest .`

`docker push ibrahimelnemr/one-pager-search-engine-backend:latest`

# Rebuild the frontend image
`docker build -t ibrahimelnemr/one-pager-search-engine-frontend:latest .`

`docker push ibrahimelnemr/one-pager-search-engine-frontend:latest`

to pull recent changes

`git pull origin main`
`docker pull ibrahimelnemr/one-pager-search-engine-backend:latest`
`docker pull ibrahimelnemr/one-pager-search-engine-frontend:latest`
`docker-compose up -d`