from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_hostname: str
    database_port: str
    database_password: str
    database_name: str
    database_username: str
    secret_key: str
    access_token: str
    algorithm: str
    access_token_expire_minutes: int
    database_url: str
    facebook_access_token: str
    instagram_user_id: str
    facebook_client_id: str
    facebook_client_secret: str
    facebook_token_url: str = "https://graph.facebook.com/v22.0/oauth/access_token"
    facebook_redirect_uri: str = "http://localhost:8000/oauth/callback/facebook"

    class Config:
        env_file = ".env"

settings = Settings()
