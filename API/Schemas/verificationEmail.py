from pydantic import BaseModel
class VerificationRequest(BaseModel):
    code: str
