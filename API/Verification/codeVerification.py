
import secrets
from API.Databases.Conn.redis import r


def generate_code():

    return str(secrets.randbelow(900000) + 100000)


def verify_code(code: str):

    saved_code = r.get("owner_verification")

    if not saved_code:
        return False

    if code != saved_code:

        attempts = r.incr("verification_attempts")

        if attempts == 1:
            r.expire("verification_attempts", 300)

        if attempts >= 5:
            r.delete(
                "owner_verification",
                "verification_attempts"
            )

        return False

    r.delete(
        "owner_verification",
        "verification_attempts",
        "verification_cooldown"
    )

    return True
