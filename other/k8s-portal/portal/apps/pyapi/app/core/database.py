import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

MARIADB_DRIVER = 'mysql+pymysql'
MARIADB_HOST = 'portal-mariadb'
MARIADB_USER = os.environ['MARIADB_USER']
MARIADB_PASS = os.environ['MARIADB_PASS']
MARIADB_DB = os.environ['MARIADB_DB']

db_url = f'{MARIADB_DRIVER}://{MARIADB_USER}:{MARIADB_PASS}@{MARIADB_HOST}/{MARIADB_DB}'
engine = create_engine(db_url)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

def init():
    Base.metadata.create_all(bind=engine)

__all__ = ['SessionLocal', 'Base', 'get_db', 'init']
