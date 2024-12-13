import os
from fastapi import Depends
from sqlalchemy.orm import Session
from ..core.database import Base, get_session
from ..core.app import app
from ..core.constants import APP_PREFIX
from . import crud
from .schemas import PostModel

@app.get(f'{APP_PREFIX}/healthcheck')
def healthcheck():
  return 'OK'

@app.get(f'{APP_PREFIX}/posts/')
# @app.get("/posts/", response_model=List[PostModel])
def get_posts(skip = 0, limit = 100, db: Session = Depends(get_session)):
  items = crud.get_posts(db, skip=skip, limit=limit)
  return items

@app.post(f'{APP_PREFIX}/posts/')
def create_post(post: PostModel, db: Session = Depends(get_session)):
  crud.create_post(db, post)
