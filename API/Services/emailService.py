
import os
import smtplib

from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()


def send_email(code: str):

    email = os.getenv("Email")
    password = os.getenv("gmail_password")
    owner = os.getenv("Authorized_Email")

    if not all([email, password, owner]):
        raise ValueError("Configuração de email incompleta.")

    msg = MIMEText(
        f"""
        Seu código de verificação é: {code}

        Esse código expira em 5 minutos.
        """
    )

    msg["Subject"] = "Código de verificação - Partiu Burguer"
    msg["From"] = email
    msg["To"] = owner

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(email, password)
        server.send_message(msg)
