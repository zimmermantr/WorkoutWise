from django.shortcuts import render
from .models import App_user
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
from django.http import HttpResponse
# Create your views here.

class Register(APIView):
    def post(self, request):
        request.data["username"] = request.data["email"]
        user = App_user.objects.create_user(**request.data)
        token = Token.objects.create(user=user)
        return Response({"user": {"email": user.email}, "token": token.key}, status= HTTP_201_CREATED)

class Log_in(APIView):
    def post(self, request):
        request.data["username"] = request.data["email"]
        user = authenticate(**request.data)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"user": {"email": user.email}, "token": token.key})
        else:
            return Response("Incorrect username or password", status=HTTP_400_BAD_REQUEST) 

class Log_out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token_key = request.auth.key  # Get the token key from the request's auth attribute
        print(f"User {request.user.email} is logging out with token: {token_key}")
        
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT) 

class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"email": request.user.email, "display_name": request.user.display_name})