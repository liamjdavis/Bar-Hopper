from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import YourModel
from .serializers import YourModelSerializer

class YourModelListView(generics.ListAPIView):
    queryset = YourModel.objects.all()
    serializer_class = YourModelSerializer