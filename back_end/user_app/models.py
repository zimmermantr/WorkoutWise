from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class App_user(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    # workouts, foreignkey link to workout
