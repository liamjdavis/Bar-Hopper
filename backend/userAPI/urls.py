from django.urls import path

from .views import (
    UserView,
    GetAuthUserView,
    UserProfile_View,
    Users_ProfilesView,
    single_UserProfile_View,
    BarView,
    GetAuthBarView,
    BarProfile_View,
    Bar_ProfilesView,
    single_BarProfile_View,
    PostView,
    LikeUnlikeView,
    ProfilePictureView
)

urlpatterns = [
    path('users', UserView.as_view(), name='user-create'),
    path('userauth', GetAuthUserView.as_view(), name='user-auth'),

    path('bars', BarView.as_view(), name='bar-create'),
    path('barauth', GetAuthBarView.as_view(), name='bar-auth'),

    path('posts', PostView.as_view(), name='post-list-create'),
    path('posts/<int:id>', PostView.as_view(), name='post-detail'),
    path('posts/<int:id>/like', LikeUnlikeView.as_view(), name='post-like-unlike'),

    path('userprofile', UserProfile_View.as_view(), name='userprofile-detail'),
    path('userprofiles', Users_ProfilesView.as_view(), name='userprofile-list'),
    path('userprofile/<int:id>', single_UserProfile_View.as_view(), name='single-userprofile'),

    path('barprofile', BarProfile_View.as_view(), name='barprofile-detail'),
    path('barprofiles', Bar_ProfilesView.as_view(), name='barprofile-list'),
    path('barprofile/<int:id>', single_BarProfile_View.as_view(), name='single-barprofile'),

    path('profile_picture', ProfilePictureView.as_view(), name='profile-picture')
]