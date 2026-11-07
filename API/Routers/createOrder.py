from ..Databases.Conn.Orders import connect_database_Order, pool_Order
from ..Databases.Conn.release_database import release_database
import os
from dotenv import load_dotenv
from ..Schemas.createOrder import createOrderSchema
import requests
from fastapi import APIRouter, Request, Form, UploadFile, File

load_dotenv(encoding="utf-8")
IMGBB_URL = os.getenv("IMGBB_URL")
router = APIRouter()


@router.post("/createOrder")
async def createOrder(
    request: Request,
    name: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    file: UploadFile = File(...),
):
    conn = None
    cursor = None
    try:
        conn, cursor = connect_database_Order()
        await file.seek(0)
        content = await file.read()
        save_image = requests.post(
            "https://api.imgbb.com/1/upload",
            params={"key": IMGBB_URL},
            files={"image": (file.filename, content, file.content_type)},
            timeout=10,
        )
        if not save_image.ok:
            return {"Status": False, "Error": save_image.status_code}

        save_image_data = save_image.json()
        cursor.execute(
            """
        INSERT INTO Orders(
        name,
        description,
        image_url,
        price,
        active)
        VALUES(
        %s,%s, %s, %s, %s)""",
            (
                name,
                description,
                save_image_data["data"]["url"],
                price,
                True,
            ),
        )
        conn.commit()
        return {"Status": True}
    except Exception as e:
        return {"Status": False, "Error": str(e)}
    finally:
        release_database(conn, cursor, pool_Order)
