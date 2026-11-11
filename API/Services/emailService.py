
import os
import requests


def send_email(code: str):

    api_key = os.getenv("MAILJET_API_KEY")
    secret_key = os.getenv("MAILJET_SECRET_KEY")
    owner = os.getenv("Authorized_Email")
    sender = os.getenv("MAILJET_SENDER")

    if not all([api_key, secret_key, owner, sender]):
        raise ValueError("Configuração do Mailjet incompleta.")

    payload = {
        "Messages": [
            {
                "From": {
                    "Email": sender,
                    "Name": "Partiu Burguer"
                },
                "To": [
                    {
                        "Email": owner
                    }
                ],
                "Subject": "Código de verificação - Partiu Burguer",
                "TextPart": (
                    f"Seu código de verificação é: {code}\n\n"
                    "Esse código expira em 5 minutos."
                )
            }
        ]
    }

    response = requests.post(
        "https://api.mailjet.com/v3.1/send",
        auth=(api_key, secret_key),
        json=payload,
        timeout=20
    )

    response.raise_for_status()

    return response.json()
