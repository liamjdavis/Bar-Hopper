from userAPI.models import CustomUser, BarProfile

user = CustomUser.objects.create_user(email='test@bar.com', user_type='bar', password='password')
BarProfile.objects.create(user=user)