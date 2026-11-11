
import os
import smtplib
import ssl

from pathlib import Path
from dotenv import load_dotenv
from email.mime.text import MIMEText

# Carrega o .env localizado na raiz do projeto
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(env_path)

email = os.getenv("Email")
password = os.getenv("gmail_password")
owner = os.getenv("Authorized_Email")
print("Email:", bool(email))
print("Senha:", bool(password))
print("Destinatário:", bool(owner))
# Verifica as configurações
if not all([email, password, owner]):
    raise ValueError(
        f"Configuração incompleta! "
        f"Email: {bool(email)}, "
        f"Senha: {bool(password)}, "
        f"Destinatário: {bool(owner)}"
    )

# Cria a mensagem
msg = MIMEText(
    "Teste de envio de email - Partiu Burguer."
)

msg["Subject"] = "Teste SMTP - Partiu Burguer"
msg["From"] = email
msg["To"] = owner

try:
    context = ssl.create_default_context()

    with smtplib.SMTP(
        "smtp.gmail.com",
        587,
        timeout=30
    ) as server:

        server.ehlo()
        server.starttls(context=context)
        server.ehlo()

        print("Conectado ao Gmail!")
        server.login(email, password)

        print("Autenticação realizada!")

        server.send_message(msg)

        print("Email enviado com sucesso!")

except Exception as e:
    print(f"Erro: {type(e).__name__}: {e}")
