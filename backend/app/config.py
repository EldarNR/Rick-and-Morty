import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Rick and Morty Explorer"
    VERSION: str = "1.0.0"
    RICK_MORTY_API_URL: str = "https://rickandmortyapi.com/api"
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

settings = Settings()
