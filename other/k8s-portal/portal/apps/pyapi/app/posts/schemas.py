from pydantic import BaseModel

class PostModel(BaseModel):
    id: int
    content: str

__all__ = ['PostModel']
