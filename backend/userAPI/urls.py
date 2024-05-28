from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.user_api, name='user_api'),
]