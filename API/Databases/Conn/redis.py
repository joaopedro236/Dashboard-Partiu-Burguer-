
import os
import redis
from dotenv import load_dotenv

load_dotenv()

redis_url = os.getenv("REDIS_URL")
if not redis_url:
    raise RuntimeError("REDIS_URL is not configured")
if not redis_url.startswith(("redis://", "rediss://")):
    raise ValueError("REDIS_URL must start with redis:// or rediss://")

r = redis.Redis.from_url(redis_url, decode_responses=True)
