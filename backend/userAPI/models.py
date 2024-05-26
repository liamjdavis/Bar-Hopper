from django.db import models

class YourModel(models.Model):
    # Define your model fields here
    field1 = models.CharField(max_length=100)
    field2 = models.IntegerField()