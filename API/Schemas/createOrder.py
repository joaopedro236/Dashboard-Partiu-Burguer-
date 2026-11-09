from pydantic import BaseModel


class createOrderSchema(BaseModel):
    name: str
    description: str
    image_url: str
    price: float
