# from django.shortcuts import render
# from rest_framework.views import APIView
# from rest_framework.response import Response
# import requests
# from requests_oauthlib import OAuth1
# import pprint
# from collections import OrderedDict
# from dotenv import dotenv_values
# from exercise_app.models import Exercise
# from rest_framework.status import (
#     HTTP_201_CREATED,
#     HTTP_204_NO_CONTENT,
#     HTTP_400_BAD_REQUEST
# )
# # Create your views here.

# pp = pprint.PrettyPrinter(indent=2, depth=3)
# env = dotenv_values(".env")

# class Api_ninja(APIView):
#     def get(self, request, muscle, workout):
#         X_Api_Key = env.get("X_Api_Key")
        
#         api_url = 'https://api.api-ninjas.com/v1/exercises?muscle={}&offset=10'.format(muscle)
#         response = requests.get(api_url, headers={'X-Api-Key': X_Api_Key})
        
#         responseJSON = response.json()
#         # print(responseJSON)
#         if response.status_code == requests.codes.ok and len(responseJSON) > 0:
#             # print(response.text)
            
#             pp.pprint(responseJSON)
#             for exercise_data in responseJSON:
#             # print(responseJSON)
#                 exercise = Exercise(
#                     exercise_name=exercise_data['name'],
#                     sets=exercise_data.get('sets', 3),  
#                     reps=exercise_data.get('reps', 10), 
#                     difficulty=exercise_data['difficulty'],
#                     equipment=exercise_data['equipment'],
#                     description=exercise_data['instructions'],
#                     targeted_muscles=exercise_data['muscle'],
#                     # parent_workout= workout
#                 )
#                 exercise.save()
#                 exercise.parent_workout.add(workout)
#         else:
#             return Response(status=HTTP_400_BAD_REQUEST)
