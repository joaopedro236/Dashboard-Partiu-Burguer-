
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
router = APIRouter()

from ..Databases.Conn.release_database import release_database
from ..Databases.Conn.Orders import connect_database_Order, pool_Order

@router.patch("/editOrder")
def edit_order(
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
            image_bytes = image.file.read()
            updates["image_url"] = image_bytes

        if not updates:
            return {'Status': False, 'Error': 'No fields submitted'}

        for field, value in updates.items():
            cursor.execute(
                f"UPDATE orders SET {field} = %s WHERE name = %s",
                (value, nameToBeReplaced)
            )

        conn.commit()

        return {"Status": True, "updates": list(updates.keys())}

    except Exception as e:
        if conn:
            conn.rollback()
        return {'Status': False, 'Error': str(e)}

    finally:
        release_database(conn, cursor, pool_Order)
