from fastapi import APIRouter, HTTPException
router = APIRouter()
from ..Schemas.editOrder import EditOrder
from ..Databases.Conn.release_database import release_database
from ..Databases.Conn.Orders import connect_database_Order, pool_Order
@router.patch("/editOrder")
def edit_order( data: EditOrder):
    conn = None
    cursor = None
    try:
        conn, cursor = connect_database_Order()
        updates = data.model_dump(exclude_unset=True, exclude={"nameToBeReplaced"})

        if not updates:
            return {'Status': False, 'Error': 'No fields submitted'}

        for field, value in updates.items():
            cursor.execute(
                f"UPDATE orders SET {field} = %s WHERE name = %s",
                (value, data.nameToBeReplaced)
            )

        conn.commit()
        return {"Status": True, "updates": updates}
    except Exception as e:
        return {'Status': False, 'Error': str(e)}
    finally:
        release_database(conn, cursor, pool_Order)