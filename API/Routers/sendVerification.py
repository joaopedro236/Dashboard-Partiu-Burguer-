from fastapi import APIRouter, HTTPException
from API.Databases.Conn.redis import r
from API.Services.emailService import send_email
from API.Verification.codeVerification import (
    generate_code
)
router = APIRouter()
@router.post("/send-verification")
def send_verification():

    if r.exists("verification_cooldown"):
        raise HTTPException(
            status_code=429,
            detail="Aguarde antes de solicitar outro código."
        )

    code = generate_code()

    r.set("owner_verification", code, ex=300)
    r.set("verification_cooldown", "1", ex=60)

    try:
        send_email(code)

    except Exception as e:

        r.delete(
            "owner_verification",
            "verification_cooldown"
        )

        raise HTTPException(
            status_code=500,
            detail="Erro ao enviar email."
        )

    return {
        "Status": True,
        "Message": "Código enviado com sucesso."
    }

