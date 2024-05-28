from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

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

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = UserManager()

    def __str__(self):
        return self.email

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', blank=True)
    bio = models.TextField()
    location = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.user.name

class SetLocation(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='set_locations', blank=True)
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

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'location']

    objects = BarManager()

    def __str__(self):
        return self.email

class BarProfile(models.Model):
    bar = models.OneToOneField(Bar, on_delete=models.CASCADE, related_name='bar_profile', blank=True)
    location = models.CharField(max_length=255, blank=True)
    hours = models.CharField(max_length=255, blank=True)
    future_promotions = models.CharField(max_length=255, blank=True)

class PromotionPost(models.Model):
    bar = models.ForeignKey(Bar, on_delete=models.CASCADE, blank=True, related_name='promotions')
    text = models.CharField(max_length=255)
    name = models.CharField(max_length=255, blank=True)
    likes = models.ManyToManyField(User, related_name="likes", blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text

    class Meta:
        ordering = ('-date',)

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_comments", blank=True)
    post = models.ForeignKey(PromotionPost, on_delete=models.CASCADE, related_name="post_comments", blank=True)
    text = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.text} - {self.user.name}"

    class Meta:
        ordering = ('-date',)