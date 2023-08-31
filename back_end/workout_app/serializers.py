from rest_framework.serializers import ModelSerializer
from .models import Workout
from exercise_app.serializers import ExerciseSerializer

class WorkoutSerializer(ModelSerializer):
    exercises = ExerciseSerializer(many=True)
    class Meta:
        model = Workout
        fields = ['id', 'workout_name', 'app_user', 'workout_details', 'exercises']
        # fields = ['__all__']