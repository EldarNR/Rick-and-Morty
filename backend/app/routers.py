from fastapi import APIRouter, Query, Path, HTTPException
from .services import RickMortyClient, AIService

router = APIRouter()


rm_client = RickMortyClient()
ai_service = AIService()

@router.on_event("shutdown")
async def shutdown():
    await rm_client.close()

@router.get("/")
async def home():
    return {"message": "Welcome to Rick and Morty API"}

@router.get("/characters")
async def list_characters(
    page: int = Query(1, ge=1),
    name: str = Query("", description="Filter by name"),
    status: str = Query("", description="Filter by status")
):
    data = await rm_client.get_characters(page=page, name=name, status=status)
    return data

@router.get("/characters/{id}")
async def character_detail(id: int = Path(..., title="The ID of the character to get")):
    try:
        character = await rm_client.get_character(id)
        description = await ai_service.generate_character_description(character)
        character["ai_description"] = description
        return character
    except Exception as e:
        raise HTTPException(status_code=404, detail="Character not found")

@router.get("/episodes")
async def list_episodes(
    page: int = Query(1, ge=1),
    name: str = Query("", description="Filter by name")
):
    data = await rm_client.get_episodes(page=page, name=name)
    return data

@router.get("/locations")
async def list_locations(
    page: int = Query(1, ge=1),
    name: str = Query("", description="Filter by name")
):
    data = await rm_client.get_locations(page=page, name=name)
    return data
