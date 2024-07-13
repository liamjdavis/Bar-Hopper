from django.apps import AppConfig
from django.db.backends.signals import connection_created
from django.dispatch import receiver

class userAPIConfig(AppConfig):
    name = 'userAPI'