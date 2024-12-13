from sqlalchemy.orm import Session
from .models import PostRow
from .schemas import PostModel

def get_post(db: Session, user_id: int):
    return db.query(PostRow).filter(PostRow.id == user_id).first()

def get_posts(db: Session, skip = 0, limit = 100):
    return db.query(PostRow).offset(skip).limit(limit).all()

def create_post(db: Session, post: PostModel):
    db_post = PostRow(content=post.content)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post
