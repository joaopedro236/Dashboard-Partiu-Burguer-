from pydantic import BaseModel
class DeleteOrderSchema(BaseModel):
    orderName: str