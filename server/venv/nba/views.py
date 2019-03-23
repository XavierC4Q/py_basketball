from __future__ import unicode_literals
from django.shortcuts import render

from rest_framework import viewsets
from .models import CustomUser, Player, Team, BaseStat
from .serializers import CustomUserSerializer, PlayerSerializer, TeamSerializer

class CustomUserViewSet(viewsets.ModelViewSet):

    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()

class PlayerViewSet(viewsets.ModelViewSet):

    serializer_class = PlayerSerializer
    queryset = Player.objects.all()

class TeamViewSet(viewsets.ModelViewSet):
    
    serializer_class = TeamSerializer
    queryset = Team.objects.all()

