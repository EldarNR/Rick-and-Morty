import httpx

from .config import settings
import asyncio

class RickMortyClient:
    def __init__(self):
        self.base_url = settings.RICK_MORTY_API_URL
        self.client = httpx.AsyncClient(timeout=10.0)

    async def close(self):
        await self.client.aclose()

    async def get_characters(self, page: int = 1, name: str = "", status: str = ""):
        params = {"page": page}
        if name:
            params["name"] = name
        if status:
            params["status"] = status
        
        try:
            response = await self.client.get(f"{self.base_url}/character", params=params)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 404:
                return {"results": [], "info": {"pages": 0, "prev": None, "next": None}}
            raise e

    async def get_character(self, character_id: int):
        response = await self.client.get(f"{self.base_url}/character/{character_id}")
        response.raise_for_status()
        return response.json()

    async def get_episodes(self, page: int = 1, name: str = ""):
        params = {"page": page}
        if name:
            params["name"] = name
        return await self._fetch("episode", params)

    async def get_locations(self, page: int = 1, name: str = ""):
        params = {"page": page}
        if name:
            params["name"] = name
        return await self._fetch("location", params)

    async def _fetch(self, endpoint: str, params: dict):
        try:
            response = await self.client.get(f"{self.base_url}/{endpoint}", params=params)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 404:
                return {"results": [], "info": {"pages": 0}}
            raise e


import google.generativeai as genai

class AIService:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        if self.api_key:
            genai.configure(api_key=self.api_key)

            self.model_candidates = [
                'gemini-2.0-flash-exp',
                'gemini-2.0-flash',
                'gemini-flash-latest',
                'gemini-1.5-flash'
            ]
        else:
            self.model_candidates = []

    async def generate_character_description(self, character_data: dict) -> str:
        if not self.model_candidates:
            return "AI description unavailable (API Key missing)."

        prompt = f"Describe the Rick and Morty character named {character_data['name']} who is a {character_data['species']} and is currently {character_data['status']}. Keep it funny and in the style of the show. Max 50 words."

        last_error = None
        
        
        for model_name in self.model_candidates:
            try:
                model = genai.GenerativeModel(model_name)
                
                response = await asyncio.to_thread(
                    model.generate_content,
                    prompt
                )
                return response.text
            except Exception as e:
                print(f"Model {model_name} failed: {e}")
                last_error = e
                continue
        
        
        print(f"All AI models failed. Last error: {last_error}")
        return f"Бесплатный лимит закончен, и необходимо подождать, чтобы всё заработало. (Wubba Lubba Dub Dub! This is {character_data['name']})"
