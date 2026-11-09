from fastapi import APIRouter
from ..Databases.Conn.Orders import connect_database_Order, pool_Order
from ..Databases.Conn.release_database import release_database
router = APIRouter()
@router.get("/getOrder")
def getOrder():
    conn = None
    cursor = None
    try:
        conn,cursor = connect_database_Order()
        cursor.execute("select name, description, image_url price, active from Orders")
        result= cursor.fetchall()
        return{"Status": True, "Name": result[0], "Description": result[1], "Image_url": result[2], "Price": result[3], "Active": result[4]}
    except Exception as e:
        return{"Status": False, "Error": str(e)}
    finally:
        release_database(conn, cursor, pool_Order)
        