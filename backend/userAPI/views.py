from django.http import JsonResponse

def user_api(request):
    data = {"message": "Hello, React Native!"}
    return JsonResponse(data)