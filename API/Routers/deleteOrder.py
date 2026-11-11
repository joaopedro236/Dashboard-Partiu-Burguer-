from fastapi import APIRouter
from ..Databases.Conn.Orders import connect_database_Order, pool_Order
from ..Databases.Conn.release_database import release_database
from ..Schemas.deleteOrder import DeleteOrderSchema
router = APIRouter()
@router.delete('/deleteOrder')
def deleteOrder(name: DeleteOrderSchema):
    conn = None
    cursor = None
    try:
        conn,cursor = connect_database_Order()
        cursor.execute('delete from Orders where name =%s', (name.orderName,))
        conn.commit()
        return{'Status': True}
    except Exception as e:
        return{'Status': False, 'Error': str(e)}
    finally:
        release_database(conn, cursor, pool_Order)