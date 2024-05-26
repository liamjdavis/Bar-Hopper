from django.urls import path
from . import views

urlpatterns = [
    path('your-models/', views.YourModelListView.as_view(), name='your-models-list'),
    # Add more patterns for other endpoints
]