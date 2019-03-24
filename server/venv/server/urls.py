from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from nba.views import CustomUserViewSet, PlayerViewSet, TeamViewSet, SeasonViewSet

router = routers.DefaultRouter()

router.register(r'users', CustomUserViewSet, 'Users')
router.register(r'teams', TeamViewSet, 'Teams')
router.register(r'players', PlayerViewSet, 'Players')
router.register(r'season', SeasonViewSet, 'Seasons')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    path('api/', include(router.urls)),
    url(r'^auth/', include('rest_auth.urls')),
    url(r'^auth/register/', include('rest_auth.registration.urls'))
]
