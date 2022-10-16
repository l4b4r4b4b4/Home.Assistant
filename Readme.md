# Prerequisites

1. [Docker](https://docs.docker.com/get-docker/)
2. [Docker-compose](https://docs.docker.com/compose/install/)
3. [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
4. VSCode
5. [VSCode Draw.io integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)
6. [VSCode Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)
7. Home Assistant Config Helper

# Quickstart

```
git clone https://github.com/l4b4r4b4b4/Home.Assistant
docker-compose up -d
```

Go to [http://localhost:8123](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for Home.Assistant

Got to [http://localhost:8080/](http://localhost:8080/) for Simulation and Optimization API

Got to [http://localhost:5001/](http://localhost:5001/) for Forecaster API and [http://localhost:5001/docs/](http://localhost:5001/docs) for Documentation

Got to [http://localhost:5000/](http://localhost:5000/) for Predictive Maintenance Agent API and [http://localhost:5000/docs/](http://localhost:5000/docs) for Documentation

Got to [http://localhost:1880](http://localhost:1880) for Automation with Node Red

Got to [http://localhost:3000](http://localhost:3000) for Grafana

Got to [http://localhost:8090](http://localhost:8090) for InfluxDB Database

# Application

The Application comprises of three parts

```
sudo curl https://github.com/docker/compose/releases/download/v2.11.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
```

# Local Development with docker compose

# Cloud Deployment with cloudbuild.yml


# Testing and Playgrounds

Use VSCode Extension Thunder Client to make requests.

## Forecaster

Forecaster offers two API endpoints.

1. Learn
2. Predict

### Learn

Method: GET
URL: http://localhost:5001/learn
JSON BODY Content: `{   "id": "string" }`

### Predict

Method: GET
URL: http://localhost:5001/predict
JSON BODY Content: `{   "id": "string" }`

## Optimizer

Method: POST

URL: http://localhost:8080/optimize

JSON Body Content:

```
{
	"cells": [{
			"id": "cell1",
			"machines": [
				{"id": "machine1A"},
				{"id": "machine1B"}] 
		},{
			"id": "cell2",
			"machines": [{"id": "machine2A"}]
		}],
	"task_modes": [{
			"id": "mode1",
			"machines": ["machine1A", "machine2A"],
			"power": [1.2, 1.3, 1.4, 1.5, 1.6, 1.7]
		},{
			"id": "mode2",
			"machines": ["machine1A", "machine2A"],
			"power": [1, 5, 7]
		},{
			"id": "modeWithoutPowerCurve",
			"machines": ["machine1A", "machine1B", "machine2A"],
			"power": [-0, -0, -0]
		}],
	"tasks": [{
			"id": "taskA",
			"task_modes": ["mode1", "mode2"]
		},{
			"id": "taskB",
			"task_modes": ["modeWithoutPowerCurve"]
		}],
	"products": [{
			"id": "productX",
			"tasks": {
				"taskA": 2,
				"taskB": 5
			}
		}],
	"constraints": [{
			"id": "constraint1",
			"type": "order",
			"parameter": {
				"first_task": "taskB",
				"second_task": "taskA"
			}
		},{
			"id": "constraint2",
			"type": "collision",
			"parameter": {
				"task1": "taskA",
				"task2": "taskB"
			}
		}],
	"energy_sources": [{
			"id": "solar",
			"availability": [0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
			                 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
			                 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
			                 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
			                 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
		},{
			"id": "socket_energy",
			"price": [10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
			          20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
			          30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
			          40, 40, 40, 40, 40, 40, 40, 40, 40, 40,
			          50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
		}],
	"configuration": {
		"time_window": 50,
		"optimisation_weights": {
			"energy_costs": 50,
			"energy_usage": 25,
			"makespan": 25
		},
		"stop_condition": {
			"seconds": 10,
			"generations": 5000,
			"stagnation": 100
		},
		"product_requests": [{
				"product": "productX",
				"amount": 5
			}],
		"num_restarts": 3
	}
}
```
