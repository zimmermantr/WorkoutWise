from django.db import models
from workout_app.models import Workout
# from muscle_app.models import Muscle
# Create your models here.
class Exercise(models.Model):
    exercise_name = models.CharField()
    sets = models.BigIntegerField(default=3) #maybe char? 3-5?
    reps = models.BigIntegerField(default=10) #maybe char? 8-12?
    difficulty = models.CharField()
    equipment = models.CharField()
    description = models.TextField()
    targeted_muscles = models.CharField()
    parent_workout = models.ManyToManyField(Workout, related_name="exercises")

    def __str__(self):
        return f"{self.exercise_name}\nSets: {self.sets}\nReps: {self.reps}"