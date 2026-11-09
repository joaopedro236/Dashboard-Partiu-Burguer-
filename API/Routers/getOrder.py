from fastapi import APIRouter
from ..Databases.Conn.Orders import connect_database_Order, pool_Order
from ..Databases.Conn.release_database import release_database

router = APIRouter()


@router.get("/getOrder")
def getOrder():
    conn = None
    cursor = None
    try:
        conn, cursor = connect_database_Order()
        cursor.execute("select name, description, image_url ,price, active from Orders")
        result = cursor.fetchall()
        return [
            {
                "Name": row[0],
                "Description": row[1],
                "Imagem_url": row[2],
                "Price": row[3],
                "Active": row[4],
            }
            for row in result
        ]

    except Exception as e:
        return {"Status": False, "Error": str(e)}
    finally:
        release_database(conn, cursor, pool_Order)
