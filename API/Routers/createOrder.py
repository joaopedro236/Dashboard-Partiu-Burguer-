
from fastapi import APIRouter, Form, UploadFile, File
from ..Databases.Conn.Orders import connect_database_Order, pool_Order
from ..Databases.Conn.release_database import release_database
import os
import requests
from dotenv import load_dotenv

load_dotenv(encoding="utf-8")

IMGBB_URL = os.getenv("IMGBB_URL")
router = APIRouter()


@router.patch("/editOrder")
async def edit_order(
    nameToBeReplaced: str = Form(...),
    name: str = Form(None),
    description: str = Form(None),
    price: float = Form(None),
    type: str = Form(None),
    image: UploadFile = File(None)
):
    conn = None
    cursor = None

    try:
        conn, cursor = connect_database_Order()

        updates = {
            "name": name,
            "description": description,
            "price": price,
            "type": type
        }

        updates = {
            field: value
            for field, value in updates.items()
            if value is not None
        }

        if image:
            content = await image.read()

            save_image = requests.post(
                "https://api.imgbb.com/1/upload",
                params={"key": IMGBB_URL},
                files={
                    "image": (
                        image.filename,
                        content,
                        image.content_type
                    )
                },
                timeout=10
            )

            if not save_image.ok:
                return {
                    "Status": False,
                    "Error": save_image.status_code
                }

            save_image_data = save_image.json()
            updates["image_url"] = save_image_data["data"]["url"]

        if not updates:
            return {"Status": False, "Error": "No fields submitted"}

        for field, value in updates.items():
            cursor.execute(
                f"UPDATE orders SET {field} = %s WHERE name = %s",
                (value, nameToBeReplaced)
            )

        conn.commit()

        return {
            "Status": True,
            "updates": list(updates.keys())
        }

    except Exception as e:
        if conn:
            conn.rollback()

        return {"Status": False, "Error": str(e)}

    finally:
        release_database(conn, cursor, pool_Order)
