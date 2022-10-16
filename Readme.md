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

Got to [http://localhost:1880](http://localhost:1880) for Automation with [Node Red](https://nodered.org/)

Got to [http://localhost:3000](http://localhost:3000) for Dashboard Cockpit

Got to [http://localhost:8090](http://localhost:8090) for Timeseries Database

# Application

The Application comprises of two parts and empowers the operator to become a combined heat and power supplier / aggregator:

The Home Owner Manangement System (HOMS) onsite and a aggregator / customer plattform in the cloud.

## Home Owner Manangement System

1. Home Owner UI powered by [Home.Assistant](https://www.home-assistant.io/)
2. [SPEAR-API by DAI-Lab](https://gitlab.dai-labor.de/spear/spear-optimisation) for Simulation and Optimization
3. Forecaster API powered by [Meta&#39;s Prophet](https://facebook.github.io/prophet/) & [Fast-API](https://fastapi.tiangolo.com/)
4. Predictive Maintenance API powered by [Meta&#39;s Prophet](https://facebook.github.io/prophet/) & [Fast-API](https://fastapi.tiangolo.com/)
5. Automation Module with [Node Red](https://nodered.org/)
6. Timeseries database [InfluxDB](https://www.influxdata.com/)
7. Dashboard Cockpit powered by [Grafana](https://grafana.com/)

## Aggregator Plattform

1. Webshop powered by [Saleor.io](https://saleor.io/) to buy
   1. Managed Software-as-a-Service with three different Service Level Agreements (SLAs)
   2. Pre-configured hardware components
2. Self service Portal for TSO, DSO, Flexible Suppliers
3. [Enterprise Resource Planning](https://www.investopedia.com/terms/e/erp.asp) (ERP) powered by [metasfresh](https://metasfresh.com/)
4. Help Desk / Ticketing System powered by [Zammad](https://zammad.com/de)
5. SMGW-Admin ([Discovergy White Label](https://discovergy.com/smart-metering-loesungen/white-label))
6. Balancing group management
7. Plattform Frontend Stack: Microfrontends with NeRNM ([NextJS](https://nextjs.org/), [ReactJS](https://reactjs.org/), [NodeJS](https://nodejs.org/), [MongoDB](https://www.mongodb.com/de-de))

# Local Development with docker compose

Stop application and remove volumes. Build images locally. Start application.

```
docker-compose down -v && docker-compose up -d --build && docker-compose logs -f -t
```

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
