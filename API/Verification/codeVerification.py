
import secrets
from API.Databases.Conn.redis import redis


def generate_code():

    return str(secrets.randbelow(900000) + 100000)


def verify_code(code: str):

    saved_code = redis.get("owner_verification")

    if not saved_code:
        return False

    if code != saved_code:

        attempts = redis.incr("verification_attempts")

        if attempts == 1:
            redis.expire("verification_attempts", 300)

        if attempts >= 5:
            redis.delete(
                "owner_verification",
                "verification_attempts"
            )

        return False

    redis.delete(
        "owner_verification",
        "verification_attempts",
        "verification_cooldown"
    )

    return True
