# Overview


# Setup

For docker

`cd frontend`

`docker build -t ibrahimelnemr/one-pager-search-engine-frontend:latest`

`cd backend`

`docker build -t ibrahimelnemr/one-pager-search-engine-backend:latest`


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

(note: replace `<es-host-url>` with actual elastic host deployment url)

`ELASTICSEARCH_HOST=http://<es-host-url>:9200 docker compose up -d`

or 
```
docker run -d -p 5050:5000 \
  -v "$(pwd)":/app \
  -e FLASK_ENV=development \
  -e ELASTICSEARCH_HOST=<http://es-host-url:9200> \
  ibrahimelnemr/one-pager-search-engine-backend:latest
```

frontend

`cd frontend`

`docker run -p 3000:3000 --name frontend -e BACKEND_URL=http://localhost:5050 ibrahimelnemr/one-pager-search-engine-frontend:latest`
