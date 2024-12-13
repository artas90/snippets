from sqlalchemy import Column, Integer, String
from ..core.database import Base

class PostRow(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(String(2048))

__all__ = ['PostRow']
