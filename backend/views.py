import base58
import datetime
import json
from django.http import JsonResponse
from nacl.signing import VerifyKey
from nacl.exceptions import BadSignatureError
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def valid_signature(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        signature = data.get('signature')
        public_key = data.get('publickey')
        timestamp = data.get('timestamp')

        current_time = datetime.datetime.now()
        sign_time = datetime.datetime.fromtimestamp(int(timestamp)/1000) + datetime.timedelta(minutes=5)
        
        if current_time >= sign_time:
            return JsonResponse({"message": "Your signature has expired"}, status=400)

        else:
            message = f"http://localhost:3000 wants you to sign in with your address {public_key} Your signature will expire in 5 mins"
            message_bytes = message.encode('utf-8')
            try:
                verify_key = VerifyKey(base58.b58decode(public_key))
                verify_key.verify(message_bytes, base58.b58decode(signature))
                return JsonResponse({"message": f"Signature is valid for user {public_key}"}, status=200)
            except BadSignatureError:
                return JsonResponse({"error": f"Signature is not valid for user {public_key}"}, status=400)
    else:
        return JsonResponse({"error": "Invalid request"}, status=400)