from rest_framework.serializers import ModelSerializer
from .models import Exercise
from muscle_app.serializers import MuscleSerializer

class ExerciseSerializer(ModelSerializer):
    targeted_muscles = MuscleSerializer(many=True)

    class Meta:
        model = Exercise
        fields = ['id', 'exercise_name', 'sets', 'reps', 'difficulty', 'equipment', 'description', 'targeted_muscles', 'parent_workout'] #__all

class ExerciseOnlySerializer(ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'exercise_name', 'sets', 'reps', 'difficulty', 'equipment', 'description']