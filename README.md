# Overview


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



