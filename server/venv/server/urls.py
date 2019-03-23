from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from nba.views import CustomUserViewSet, PlayerViewSet, TeamViewSet

router = routers.DefaultRouter()

router.register(r'users', CustomUserViewSet, 'Users')
router.register(r'teams', TeamViewSet, 'Teams')
router.register(r'players', PlayerViewSet, 'Players')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    path('api/', include(router.urls)),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls'))
]
