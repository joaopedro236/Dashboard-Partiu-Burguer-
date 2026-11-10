from fastapi import APIRouter
from ..Verification.IPVerification import IPVerification
router = APIRouter()
@router.get('/authorization')
def authorization():
    try:
        result =IPVerification()
        return result
    except Exception as e:
        return {'Status': False, 'Error':str(e)}
 