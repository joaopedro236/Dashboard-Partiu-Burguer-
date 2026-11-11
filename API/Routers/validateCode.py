
from fastapi import APIRouter, HTTPException, Response
from ..Schemas.verificationEmail import VerificationRequest
import secrets
from API.Databases.Conn.redis import r
from API.Verification.codeVerification import (

    verify_code
)
router = APIRouter()

@router.post("/verify-code")
def validate_code(data: VerificationRequest, response: Response):

    if not verify_code(data.code):
        raise HTTPException(
            status_code=400,
            detail="Código incorreto, expirado ou inválido."
        )
    r.delete("owner_verification")
    token = secrets.token_urlsafe(32)
    r.set(
            f"authorized:{token}",
            "1",
            ex=28800
        )
    response.set_cookie(
        key="authorization",
        value=token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=28800
    )
    return {
        "Status": True,
        "Message": "Verificação concluída!"
    }
