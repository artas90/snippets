### setup

1. Run `task venv`
2. Choose interpreter in IDE to `.venv/bin/python3`

### create post

```
curl -X POST http://localhost:8080/api/pypi/posts/ -d '{ "id": 1, "content": "value1" }'
```
