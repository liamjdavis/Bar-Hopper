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
    CommentView,
    LikeUnlikeView
)

urlpatterns = [
    path('users', UserView.as_view()),
    path('userauth', GetAuthUserView.as_view()),
    
    path('bars', BarView.as_view()),
    path('barauth', GetAuthBarView.as_view()),

    path('posts', PostView.as_view()),
    path('posts/<int:id>', PostView.as_view()),
    path('posts/<int:id>/like', LikeUnlikeView.as_view()),
    path('posts/<int:id>/comments', CommentView.as_view()),
    path('posts/comments/<int:id>', CommentView.as_view()),

    path('userprofile', UserProfile_View.as_view()),
    path('userprofiles', Users_ProfilesView.as_view()),
    path('userprofile/<int:id>', single_UserProfile_View.as_view()),
    
    path('barprofile', BarProfile_View.as_view()),
    path('barprofiles', Bar_ProfilesView.as_view()),
    path('barprofile/<int:id>', single_BarProfile_View.as_view())
]