from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone

'''

User Models

'''
class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, name, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        if not name:
            raise ValueError('Users must have names')

        email = self.normalize_email(email)
        name = name.strip()
        user = self.model(name=name, email=email)
        user.set_password(password)
        user.save(using=self._db)

        return user

class User(AbstractBaseUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    date = models.DateTimeField(auto_now_add=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = UserManager()

    def __str__(self):
        return self.email

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField()
    location = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.user.name

class SetLocation(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='set_locations')
    bar = models.ForeignKey('Bar', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.user.name} - {self.bar.name}'

'''

Bar Models

'''
class BarManager(BaseUserManager):
    use_in_migrations = True

    def create_bar(self, name, email, location, password=None):
        if not name:
            raise ValueError("Must have a name")

        if not email:
            raise ValueError("Must have an email")

        if not location:
            raise ValueError("Must have a location")

        email = self.normalize_email(email)
        bar = self.model(name=name, email=email, location=location)
        bar.set_password(password)
        bar.save(using=self._db)

        return bar

class Bar(AbstractBaseUser):
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=255, unique=True)
    location = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'location', 'type']

    objects = BarManager()

    def __str__(self):
        return self.email

class BarProfile(models.Model):
    bar = models.OneToOneField(Bar, on_delete=models.CASCADE, related_name='bar_profile')
    location = models.CharField(max_length=255, blank=True)
    hours = models.CharField(max_length=255, blank=True)
    future_promotions = models.CharField(max_length=255, blank=True)

class PromotionPost(models.Model):
    bar = models.ForeignKey(Bar, on_delete=models.CASCADE, related_name='promotions')
    text = models.CharField(max_length=255)
    name = models.CharField(max_length=255, blank=True)
    likes = models.ManyToManyField(User, related_name="promotion_likes", blank=True)
    date = models.DateTimeField(default=timezone.now)
    image = models.ImageField(upload_to='promotion_images/', null=True, blank=True)

    def __str__(self):
        return self.text

    class Meta:
        ordering = ('-date',)

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_comments")
    post = models.ForeignKey(PromotionPost, on_delete=models.CASCADE, related_name="post_comments")
    text = models.CharField(max_length=255)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.text} - {self.user.name}"

    class Meta:
        ordering = ('-date',)

# Signals to create profiles when User or Bar is created
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=Bar)
def create_bar_profile(sender, instance, created, **kwargs):
    if created:
        BarProfile.objects.create(bar=instance)