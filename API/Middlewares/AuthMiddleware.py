from fastapi import Request
from fastapi.responses import JSONResponse
from API.Databases.Conn.redis import redis

PUBLIC_ROUTES = {
    ("GET", "/authorization"),
    ("POST", "/verify-code"),
    ("POST", "/send-verification"),
}


async def AuthMiddleware(request: Request, call_next):
    if request.method == "OPTIONS":
        return await call_next(request)

    path = request.url.path.rstrip("/") or "/"
    if path in {"/docs", "/redoc", "/openapi.json"}:
        return JSONResponse(status_code=404, content={"detail": "Not Found"})
    if (request.method, path) in PUBLIC_ROUTES:
        return await call_next(request)

    token = request.cookies.get("authorization")

    if not token or not redis.exists(f"authorized:{token}"):
        return JSONResponse(
            status_code=401,
            content={"Status": False, "Error": "Unauthorized"}
        )

    return await call_next(request)