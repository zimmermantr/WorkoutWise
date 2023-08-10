from rest_framework.serializers import ModelSerializer
from .models import Workout
from exercise_app.serializers import ExerciseOnlySerializer

class WorkoutSerializer(ModelSerializer):
    exercises = ExerciseOnlySerializer(many=True)
    class Meta:
        model = Workout
        fields = ['id', 'workout_name', 'app_user', 'workout_details', 'exercises']