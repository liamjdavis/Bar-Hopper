from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import (
    User,
    UserProfile,
    Bar,
    BarProfile,
    PromotionPost,
    Comment
)

'''

Bar Serializers

'''
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'date', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.save()
        Token.objects.create(user=user)
        return user

class UserProfile_Serializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

'''

Bar Serializers

'''    
class BarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bar
        fields = ['id', 'name', 'email', 'location', 'date', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}
        
    def create(self, validated_data):
        bar = Bar.objects.create_bar(**validated_data)
        bar.save()
        Token.objects.create(bar=bar)
        return bar
    
class BarProfile_Serializer(serializers.ModelSerializer):
    class Meta:
        model = BarProfile
        fields = '__all__'
        

class PromotionPost_Serializer(serializers.ModelSerializer):
    class Meta:
        model = PromotionPost
        fields = ['id', 'bar', 'text', 'name', 'date', 'likes', 'post_comments']
        
class CommentSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.name',read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id','user','post','text','date','name']

class GetPostSerializer(serializers.ModelSerializer):
    post_comments = CommentSerializer(many=True)
    class Meta:
        model = PromotionPost
        fields = ['id','user','text','name','avatar','date','likes','post_comments']