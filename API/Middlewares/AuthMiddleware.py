from fastapi import Request
from fastapi.responses import JSONResponse
from API.Databases.Conn.redis import redis

PUBLIC_ROUTES = [
    "/authorization",
    "/validateCode",
    "/sendVerification"
]
async def AuthMiddleware(request: Request, call_next):

    if request.url.path in PUBLIC_ROUTES:
        return await call_next(request)

    token = request.cookies.get("authorization")

    if not token or not redis.exists(f"authorized:{token}"):
        return JSONResponse(
            status_code=401,
            content={"Status": False, "Error": "Unauthorized"}
        )

    return await call_next(request)