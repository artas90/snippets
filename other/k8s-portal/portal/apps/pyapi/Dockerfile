FROM python:3.8-alpine
COPY /app/requirements.txt /requirements.txt
RUN pip install configparser wheel && pip install -r /requirements.txt
COPY ./app /app
EXPOSE 80
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
