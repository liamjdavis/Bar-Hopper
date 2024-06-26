from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import (
    User,
    UserProfile,
    Friendship,
    Bar,
    BarProfile,
    BarFollow,
    PromotionPost,
    Comment
)

'''

User Serializers

'''
class UserSerializer(serializers.ModelSerializer):
    friends = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'date', 'password', 'profile_picture']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.save()
        Token.objects.create(user=user)
        return user
    
    def get_friends(self, obj):
        return UserSerializer(obj.get_friends(), many=True)

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class FriendshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friendship
        fields = ['id', 'user', 'friend']

'''

Bar Serializers

'''    
class BarSerializer(serializers.ModelSerializer):
    followers = serializers.SerializerMethodField()
    
    class Meta:
        model = Bar
        fields = ['id', 'name', 'email', 'location', 'type', 'date', 'password', 'profile_picture']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}
        
    def create(self, validated_data):
        bar = Bar.objects.create_bar(**validated_data)
        bar.save()
        Token.objects.create(user=bar)
        return bar
    
    def get_followers(self, obj):
        return UserSerializer(obj.get_followers(), many=True)
    
class BarProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = BarProfile
        fields = '__all__'

class BarFollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = BarFollow
        fields = ['id', 'user', 'bar']

class PromotionPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromotionPost
        fields = ['id', 'bar', 'text', 'name', 'date', 'likes', 'post_comments', 'image']

class CommentSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.name', read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'text', 'date', 'name']

class GetPostSerializer(serializers.ModelSerializer):
    post_comments = CommentSerializer(many=True)
    class Meta:
        model = PromotionPost
        fields = ['id', 'bar', 'text', 'name', 'date', 'likes', 'post_comments']