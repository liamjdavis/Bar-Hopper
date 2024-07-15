from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status, generics, permissions, parsers

from django.db import transaction

from django.conf import settings
import requests

from .serializers import (
    CustomUserSerializer,
    UserProfileSerializer,
    BarProfileSerializer,
    PromotionPostSerializer,
    CommentSerializer,
    GetPostSerializer,
    ProfilePictureSerializer
)

from .models import (
    CustomUser,
    UserProfile,
    BarProfile,
    PromotionPost,
    Comment
)

'''

User Views

'''
class UserView(APIView):
    def post(self, request):
        print(request.data)
        serializer = CustomUserSerializer(data=request.data)

        if serializer.is_valid():
            print("serializer is valid")

            try:
                user = serializer.save()
                print("User saved in views: ", user)

                token = Token.objects.get(user=user)
                print("Token retrieved: ", token.key)

                response_data = {
                    'token': token.key,
                    'user': CustomUserSerializer(user, context={'request': request}).data
                }
                return Response(data=response_data, status=status.HTTP_201_CREATED)

            except Exception as e:
                print("Error during response handling: ", str(e))
                return Response(data={'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            print("serializer is not valid")
            print(serializer.errors)
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetAuthUserView(APIView):
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        token = request.headers.get('Authorization')
        if not token:
            return Response(data={'error':'No Token. Authorization Denied'}, status=status.HTTP_401_UNAUTHORIZED)
        user = CustomUser.objects.get(id=request.user.id)
        data = CustomUserSerializer(user).data
        return Response(data)

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if email == "" or password == "":
            return Response({'error': 'Please provide both email and password'},status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=email, password=password)

        if not user:
            return Response({'error': 'Invalid Credentials'},status=status.HTTP_404_NOT_FOUND)

        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)

class Users_ProfilesView(APIView):
    def get(self, request):
        user_profiles = UserProfile.objects.all()
        user_data = UserProfileSerializer(user_profiles, many=True).data
        return Response(data=user_data, status=status.HTTP_200_OK)

class UserProfile_View(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        try:
            profile = request.user.user_profile
        except ObjectDoesNotExist:
            return Response(data={'error': "No profile found"}, status=status.HTTP_404_NOT_FOUND)

        profile_data = UserProfileSerializer(request.user.user_profile).data
        return Response(data=profile_data, status=status.HTTP_200_OK)

    def delete(self, request):
        request.user.delete()
        return Response(data={'msg': "Profile and user deleted"}, status= status.HTTP_204_NO_CONTENT)

class single_UserProfile_View(APIView):
    def get(self, request, *args, **kwargs):
        try:
            user = CustomUser.objects.get(id=kwargs.get('id'))
            profile_data = UserProfileSerializer(user.user_profile).data
            return Response(data=profile_data, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response(data={'error': "No profile found"}, status=status.HTTP_404_NOT_FOUND)

'''

Bar Views

'''

class BarView(APIView):
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            token = Token.objects.get(user_id=serializer.data.get('id'))
            return Response(data={'token': token.key}, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetAuthBarView(APIView):
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        token = request.headers.get('Authorization')
        if not token:
            return Response(data={'error':'No Token. Authorization Denied'}, status=status.HTTP_401_UNAUTHORIZED)
        bar = CustomUser.objects.get(id=request.user.id)
        data = CustomUserSerializer(bar).data
        return Response(data)

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if email == "" or password == "":
            return Response({'error': 'Please provide both email and password'},status=status.HTTP_400_BAD_REQUEST)

        bar = authenticate(username=email, password=password)

        if not bar:
            return Response({'error': 'Invalid Credentials'},status=status.HTTP_404_NOT_FOUND)

        token, _ = Token.objects.get_or_create(user=bar)
        return Response({'token': token.key}, status=status.HTTP_200_OK)

class Bar_ProfilesView(APIView):
    def get(self, request):
        bar_profiles = BarProfile.objects.all()
        bar_data = BarProfileSerializer(bar_profiles, many=True).data
        return Response(data=bar_data, status=status.HTTP_200_OK)

class BarProfile_View(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        try:
            profile = request.user.bar_profile
        except ObjectDoesNotExist:
            return Response(data={'error': "No profile found"}, status=status.HTTP_404_NOT_FOUND)

        profile_data = BarProfileSerializer(request.user.bar_profile).data
        return Response(data=profile_data, status=status.HTTP_200_OK)

    def delete(self, request):
        request.user.delete()
        return Response(data={'msg': "Profile and user deleted"}, status= status.HTTP_204_NO_CONTENT)

class single_BarProfile_View(APIView):
    def get(self, request, *args, **kwargs):
        try:
            bar = CustomUser.objects.get(id=kwargs.get('id'))
            profile_data = BarProfileSerializer(bar.bar_profile).data
            return Response(data=profile_data, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response(data={'error': "No profile found"}, status=status.HTTP_404_NOT_FOUND)

'''

Profile Picture

'''

class ProfilePictureView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = ProfilePictureSerializer(user)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        user = request.user
        serializer = ProfilePictureSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

'''

Posts, Likes and Comments

'''

class PostView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        post_id = kwargs.get('id')
        if post_id:
            try:
                post = PromotionPost.objects.get(id=post_id)
                return Response(GetPostSerializer(post).data, status=status.HTTP_200_OK)
            except ObjectDoesNotExist:
                return Response({'error': "No post found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            posts = PromotionPost.objects.all()
            posts_data = PromotionPostSerializer(posts, many=True).data
            return Response(data=posts_data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = PromotionPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(bar=request.user, name=request.user.name)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        post_id = kwargs.get('id')
        try:
            post = PromotionPost.objects.get(id=post_id)
            if post.bar.id == request.user.id:
                post.delete()
                return Response({'msg': 'Post deleted'}, status=status.HTTP_200_OK)
            else:
                return Response({'Error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        except ObjectDoesNotExist:
            return Response({'error': "No post found"}, status=status.HTTP_404_NOT_FOUND)

class LikeUnlikeView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        post_id = kwargs.get('id')
        try:
            post = PromotionPost.objects.get(id=post_id)
            liked = post.likes.filter(id=request.user.id).exists()

            if liked:
                post.likes.remove(request.user.id)
                return Response(GetPostSerializer(post).data , status=status.HTTP_200_OK)
            else:
                post.likes.add(request.user.id)
                post.save()
                return Response(GetPostSerializer(post).data , status=status.HTTP_200_OK)
        except:
            return