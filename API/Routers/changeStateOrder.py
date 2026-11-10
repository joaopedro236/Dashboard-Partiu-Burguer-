from ..Schemas.changeStateOrder import acquireOrderID
from ..Databases.Conn.release_database import release_database
from ..Databases.Conn.Orders import connect_database_Order, pool_Order
from fastapi import APIRouter
router = APIRouter()
@router.put("/chargeStateOrder")
def changeStateOrder(orderId: acquireOrderID):
    conn = None
    cursor = None
    try:
        conn, cursor = connect_database_Order()
        cursor.execute("""
        update Orders
        set active  = not active where id = %s""", (orderId.id))
        conn.commit()
        return {"Status": True}
    except Exception as e:
        return{"Status": False, "Error": str(e)}
    finally:
        release_database(conn, cursor, pool_Order)