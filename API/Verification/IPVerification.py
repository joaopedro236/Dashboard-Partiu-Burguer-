import requests
import os
from dotenv import load_dotenv
load_dotenv(encoding="utf-8")
authorizedIP = os.getenv('Authorized_IP')
def IPVerification():
    try:
        response = requests.get('https://api.ipify.org/?format=json',
    timeout=10)
        response.raise_for_status()
        data = response.json()
        ip = data['ip']
        if ip != str(authorizedIP).strip():
            return{'Status': False, 'Error': 'Your IP is not authorized/ Seu IP não esta autorizado'}
        return {'Status': True}
    except Exception as e:
        return{'Status': False, 'Error': str(e)}