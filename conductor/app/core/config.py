from pydantic import BaseSettings

class Config(BaseSettings):
    service_name: str = 'Home.Assistant Energy Plant Conductor'
    secret_key: str = 's3cr3t_k3y'


config = Config()
