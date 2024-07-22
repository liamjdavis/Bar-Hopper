from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone

'''

User Models

'''

class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, user_type, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, user_type=user_type, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, 'admin', password, **extra_fields)

class CustomUser(AbstractBaseUser):
    USER_TYPE_CHOICES = (
        ('user', 'User'),
        ('bar', 'Bar'),
        ('admin', 'Admin'),
    )

    email = models.EmailField(unique=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # Common fields for both user and bar
    name = models.CharField(max_length=255, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)

    # Specific fields for bars
    bar_name = models.CharField(max_length=255, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    hours = models.CharField(max_length=255, blank=True, null=True)
    future_promotions = models.CharField(max_length=255, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_type']

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def get_friends(self):
        if self.user_type == 'user':
            return [friendship.friend for friendship in self.friend_set.all()]
        return []

    def get_followed_bars(self):
        if self.user_type == 'user':
            return [follow.bar for follow in self.following_set.all()]
        return []

    def get_followers(self):
        if self.user_type == 'bar':
            return [follow.user for follow in self.followed_by_set.all()]
        return []

class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='user_profile')
    name = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.user.name

class Friendship(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='friend_set')
    friend = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='friended_by_set')

    class Meta:
        unique_together = ('user', 'friend')

class BarFollow(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='following_set')
    bar = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='followed_by_set')

    class Meta:
        unique_together = ('user', 'bar')

class PromotionPost(models.Model):
    bar = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='promotions')
    text = models.CharField(max_length=255)
    name = models.CharField(max_length=255, blank=True)
    likes = models.ManyToManyField(CustomUser, related_name="promotion_likes", blank=True)
    date = models.DateTimeField(default=timezone.now)
    image = models.ImageField(upload_to='promotion_images/', null=True, blank=True)

    def __str__(self):
        return self.text

    class Meta:
        ordering = ('-date',)

class Comment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="user_comments")
    post = models.ForeignKey(PromotionPost, on_delete=models.CASCADE, related_name="post_comments")
    text = models.CharField(max_length=255)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.text} - {self.user.name}"

    class Meta:
        ordering = ('-date',)

# Signals to create profiles when CustomUser is created
from django.db.models.signals import post_save
from django.dispatch import receiver

class BarProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='bar_profile')
    name = models.CharField(max_length=255, blank=True)
    location = models.CharField(max_length=255, blank=True)
    hours = models.CharField(max_length=255, blank=True)
    future_promotions = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.user.name