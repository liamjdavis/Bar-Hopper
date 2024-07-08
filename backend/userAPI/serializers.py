from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.db import transaction
from .models import (
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
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    friends = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'date', 'password', 'profile_picture', 'friends']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def get_friends(self, obj):
        return [friend.email for friend in obj.get_friends()]

    @transaction.atomic
    def create(self, validated_data):
        print("User Serializer create()")
        print("Validated data: ", validated_data)

        user = User.objects.create_user(**validated_data)
        print("User before tokenization ", user.__dict__)
        print("User created, about to tokenize")

        try:
            token, created = Token.objects.get_or_create(user=user)
            if created:
                print("Token created: ", token.key)
            else:
                print("Token already exists for user: ", token.key)
            print("User and Token creation successful")

            # Ensuring transaction is committed
            transaction.on_commit(lambda: print("Transaction committed successfully"))
            return user
        except Exception as e:
            print("Error during token creation: ", str(e))
            raise serializers.ValidationError({"error": "Token creation failed"})

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
        Token.objects.get_or_create(user=bar)
        print("bar created")
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