from fastapi import FastAPI

from app.api.endpoints import optimize


def create_api():
    api = FastAPI()

    api.include_router(optimize.router)

    return api
