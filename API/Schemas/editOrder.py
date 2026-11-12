from pydantic import BaseModel
from typing import Optional

class EditOrder(BaseModel):
    nameToBeReplaced: str
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    type: Optional[str] = None