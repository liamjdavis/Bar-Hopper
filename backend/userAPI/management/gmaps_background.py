# from django.core.management.base import BaseCommand
# import requests
# from ..models import Bar

# class Bar_Locations(BaseCommand):
#     help = 'populates database with NYC bars'
    
#     def handle(self, *args, **options):
#         url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
        
#         params = {
#             "location": "40.7128,-74.0060",
#             "radius": "50000",
#             "type": "bar",
#             "key": "",
#         }
        
#         response = requests.get(url, params=params)
#         data = response.json()
        
#         for place in data['results']:
#             Bar.objects.create(
#                 name=place['name'],
#                 location=place['vicinity'],
#             )

#         self.stdout.write(self.style.SUCCESS('Successfully populated the database with bars in NYC'))