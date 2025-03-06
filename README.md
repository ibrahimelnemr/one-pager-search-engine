# Setup

## Backend

`cd backend`

`python -m venv venv`

`source venv/bin/activate`

(within venv) `pip install -r requirements.txt`

(within venv) `python -m ipykernel install --user --name=venv --display-name "Python (venv)"`

Open vscode command palette, find "Python: Select Interpreter" then choose the interpreter inside myenv

on macOS/linux will be `./venv/bin/python`

on windows will be `.\venv\Scripts\python.exe`


### Elastic Search

To setup elastic search locally, run 

`docker run -d --name es-local -p 9200:9200 -e "discovery.type=single-node" -e "xpack.security.enabled=false" docker.elastic.co/elasticsearch/elasticsearch:8.17.2`

Note that the elasticsearch version must be `8.17.2`

## Frontend

