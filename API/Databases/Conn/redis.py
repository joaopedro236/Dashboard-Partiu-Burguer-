
import os
import redis
from dotenv import load_dotenv

load_dotenv()

r = redis.Redis.from_url(
    os.getenv("REDIS_PASSWORD"),
    decode_responses=True
)
