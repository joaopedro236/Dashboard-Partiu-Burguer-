from fastapi import APIRouter, Request
from API.Databases.Conn.redis import r

router = APIRouter()


@router.get("/authorization")
def authorization(request: Request):

    token = request.cookies.get("authorization")

    if not token:
        return {"Status": False}

    if not r.exists(f"authorized:{token}"):
        return {"Status": False}

    return {"Status": True}