from django.db import models
from user_app.models import App_user
# Create your models here.

class Workout(models.Model):
    workout_name = models.CharField(unique=True)
    app_user = models.ForeignKey(App_user, on_delete=models.CASCADE, related_name="workouts")
    workout_details = models.TextField()
    #exercises, linked to Exercise

    def __str__(self):
        return f"{self.workout_name}"
