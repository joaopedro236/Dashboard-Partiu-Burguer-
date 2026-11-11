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
        cursor.execute("select id, name, description, image_url ,price, active,type from Orders ORDER BY id ASC")
        result = cursor.fetchall()
        return [
            {
                'Id': row[0],
                "Name": row[1],
                "Description": row[2],
                "Imagem_url": row[3],
                "Price": row[4],
                "Active": row[5],
                'Type': row[6]
            }
            for row in result
        ]

    except Exception as e:
        return {"Status": False, "Error": str(e)}
    finally:
        release_database(conn, cursor, pool_Order)
