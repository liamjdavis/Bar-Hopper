from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.conf import settings
import requests

from .serializers import (
    UserSerializer,
    UserProfile_Serializer,
    BarSerializer,
    BarProfile_Serializer,
    PromotionPost_Serializer,
    CommentSerializer,
    GetPostSerializer
)

from .models import (
    User,
    UserProfile,
    Bar,
    BarProfile,
    PromotionPost,
    Comment
)

'''

User Views

'''
class UserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            token = Token.objects.get(user_id=serializer.data.get('id'))
            return Response(data={'token': token.key}, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetAuthUserView(APIView):
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        token = request.headers.get('Authorization')
        if not token:
            return Response(data={'error':'No Token. Authorization Denied'}, status=status.HTTP_401_UNAUTHORIZED)
        user = User.objects.get(id=request.user.id)
        data = UserSerializer(user).data
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
        user_data = UserProfile_Serializer(user_profiles, many=True).data
        return Response(data=user_data, status=status.HTTP_200_OK)
    
class UserProfile_View(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def get(self, request, *args, **kwargs):
        try:
            profile = request.user.profile
        except ObjectDoesNotExist:
            return Response(data={'error': "No profile found"}, status=status.HTTP_404_NOT_FOUND)
        
        profile_data = UserProfile_Serializer(request.user.profile).data
        return Response(data=profile_data, status=status.HTTP_200_OK)
    
    def delete(self, request):
        request.user.delete()
        return Response(data={'msg': "Profile and user deleted"}, status= status.HTTP_204_NO_CONTENT)
    
class single_UserProfile_View(APIView):
    def get(self, request, *args, **kwargs):
        try:
            user = User.objects.get(id=kwargs.get('id'))
            profile_data = UserProfile_Serializer(user.profile).data
            return Response(data=profile_data, status=status.HTTP_200_OK)
            
        except ObjectDoesNotExist:
            return Response(data={'error': "No profile found"}, status=status.HTTP_404_NOT_FOUND)

'''

Bar Views

'''

class BarView(APIView):
    def post(self, request):
        serializer = BarSerializer(data=request.data)

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
        bar = Bar.objects.get(id=request.user.id)
        data = BarSerializer(bar).data
        return Response(data)
        
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if email == "" or password == "":
            return Response({'error': 'Please provide both email and password'},status=status.HTTP_400_BAD_REQUEST)
        
        bar = authenticate(username=email, password=password)

        if not bar:
            return Response({'error': 'Invalid Credentials'},status=status.HTTP_404_NOT_FOUND)

        token, _ = Token.objects.get_or_create(bar=bar)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    
class Bar_ProfilesView(APIView):
    def get(self, request):
        bar_profiles = BarProfile.objects.all()
        bar_data = BarProfile_Serializer(bar_profiles, many=True).data
        return Response(data=bar_data, status=status.HTTP_200_OK)
    
class BarProfile_View(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def get(self, request, *args, **kwargs):
        try:
            profile = request.bar.profile
        except ObjectDoesNotExist:
            return Response(data={'error': "No profile found"}, status=status.HTTP_404_NOT_FOUND)
        
        profile_data = BarProfile_Serializer(request.user.profile).data
        return Response(data=profile_data, status=status.HTTP_200_OK)
    
    def delete(self, request):
        request.bar.delete()
        return Response(data={'msg': "Profile and user deleted"}, status= status.HTTP_204_NO_CONTENT)
    
class single_BarProfile_View(APIView):
    def get(self, request, *args, **kwargs):
        try:
            bar = Bar.objects.get(id=kwargs.get('id'))
            profile_data = BarProfile_Serializer(bar.profile).data
            return Response(data=profile_data, status=status.HTTP_200_OK)
            
        except ObjectDoesNotExist:
            return Response(data={'error': "No profile found"}, status=status.HTTP_404_NOT_FOUND)


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
            posts_data = PromotionPost_Serializer(posts, many=True).data
            return Response(data=posts_data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = PromotionPost_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(bar=request.bar, name=request.bar.name, avatar=request.bar.avatar)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        post_id = kwargs.get('id')
        try:
            post = PromotionPost.objects.get(id=post_id)
            if post.bar.id == request.bar.id:
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
            liked = post.likes.filter(id=request.bar.id).exists()

            if liked:
                post.likes.remove(request.bar.id)
                return Response(GetPostSerializer(post).data , status=status.HTTP_200_OK)
            else:
                post.likes.add(request.bar.id)
                post.save()
                return Response(GetPostSerializer(post).data , status=status.HTTP_200_OK)
        except:
            return Response({'error': "No post found"}, status=status.HTTP_404_NOT_FOUND)


class CommentView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        post_id = kwargs.get('id')
        comment_id = kwargs.get('c_id')

        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            post = PromotionPost.objects.filter(id=post_id).first()
            if post:
                serializer.save(bar=request.bar, post=post)
                return Response(serializer.data , status=status.HTTP_200_OK)
            else:
                return Response({'error': "No post found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    def delete(self, request, *args, **kwargs):
        comment_id = kwargs.get('id')
        try:
            comment = Comment.objects.get(id=comment_id)
            if comment.bar.id == request.bar.id:
                comment.delete()
                return Response({'msg': "Comment Deleted"} , status=status.HTTP_200_OK)
            else:
                return Response({'error': "Unauthorized"} , status=status.HTTP_401_UNAUTHORIZED)

        except ObjectDoesNotExist:
            return Response({'error': "No comment found"}, status=status.HTTP_404_NOT_FOUND)