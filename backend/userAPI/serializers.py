from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.db import transaction
from .models import (
    CustomUser,
    UserProfile,
    BarProfile,
    PromotionPost,
    Comment
)

User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'email', 'password', 'profile_picture', 'user_type', 'profile']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def get_profile(self, obj):
        if obj.user_type == 'user':
            return UserProfileSerializer(obj.user_profile).data
        elif obj.user_type == 'bar':
            return BarProfileSerializer(obj.bar_profile).data
        return None

    @transaction.atomic
    def create(self, validated_data):
        user_type = validated_data.pop('user_type')
        print("User type: ", user_type)
        user = User.objects.create_user(user_type=user_type, **validated_data)
        user.save()

        # Check if user is saved in the database
        try:
            user_check = User.objects.get(email=user.email)
        except User.DoesNotExist:
            raise serializers.ValidationError({"error": "User not saved in database"})

        # Create token
        try:
            token, created = Token.objects.get_or_create(user=user)
            if created:
                print("Token created: ", token.key)
            else:
                print("Token already exists for user: ", token.key)
        except Exception as e:
            raise serializers.ValidationError({"error": "Token creation failed", "details": str(e)})

        # Check if profile is created
        try:
            if user_type == 'user':
                print("Creating user profile")
                profile, created = UserProfile.objects.get_or_create(user=user)
            elif user_type == 'bar':
                profile, created = BarProfile.objects.get_or_create(user=user)

            if not created:
                raise serializers.ValidationError({"error": "Profile not created"})
            else:
                print("Profile created: ", profile)

            return user
        except Exception as e:
            raise serializers.ValidationError({"error": "Profile creation failed", "details": str(e)})

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class BarProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = BarProfile
        fields = '__all__'

class ProfilePictureSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField()

    class Meta:
        model = User
        fields = ['profile_picture']

class PromotionPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromotionPost
        fields = ['id', 'bar', 'text', 'date', 'likes', 'post_comments', 'image']

class CommentSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'text', 'date', 'name']

class GetPostSerializer(serializers.ModelSerializer):
    post_comments = CommentSerializer(many=True)
    class Meta:
        model = PromotionPost
        fields = ['id', 'bar', 'text', 'date', 'likes', 'post_comments']
