# Setup

## Backend

`python -m venv venv`

`source venv/bin/activate`

`pip install flask`
    
`pip install jupyter`

`pip install ipykernel`

`python -m ipykernel install --user --name=venv --display-name "Python (venv)"`

Open vscode command palette, find "Python: Select Interpreter" then choose the interpreter inside myenv

on macOS/linux will be `./myenv/bin/python`

on windows will be `.\myenv\Scripts\python.exe`


### Elastic Search

To setup elastic search locally, run 

`docker run -d --name es-local -p 9200:9200 -e "discovery.type=single-node" -e "xpack.security.enabled=false" docker.elastic.co/elasticsearch/elasticsearch:8.17.2`

Note that the elasticsearch version must be `8.17.2`

## Frontend

