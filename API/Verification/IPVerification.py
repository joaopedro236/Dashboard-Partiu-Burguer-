import requests
import os
from dotenv import load_dotenv
load_dotenv(encoding="utf-8")
authorizedIP = os.getenv('Authorized_IP')
def IPVerification():
    try:
        response = requests.get('https://api.ipify.org/?format=json ')
        if response.status_code != 200:
            return{'Status': False, 'Error': 'The IP verification API did not provide a response.'}
        data = response.json()
        if data.ip != str(authorizedIP ):
            return{'Status': False, 'Error': 'Your IP is not authorized/ Seu IP não esta autorizado'}
        return {'Status': True}
    except Exception as e:
        return{'Status': False, 'Error': str(e)}