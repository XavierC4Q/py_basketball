from __future__ import unicode_literals
from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import CustomUser, Player, Season, Team
from .serializers import CustomUserSerializer, PlayerSerializer, SeasonSerializer, TeamSerializer

class CustomUserViewSet(viewsets.ModelViewSet):

    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()

    @action(detail=False, methods=['GET'])
    def fans(self, request):
        fans_of_team = request.GET.get('team', '')
        result = CustomUser.objects.filter(favorite_team__icontains=fans_of_team)

        serializer = self.get_serializer(result, many=True)

        return Response(serializer.data)

class PlayerViewSet(viewsets.ModelViewSet):

    serializer_class = PlayerSerializer
    queryset = Player.objects.all()

    @action(detail=False, methods=['GET'])
    def team(self, request):
        team_param = request.GET.get('team', '')
        result = Player.objects.filter(team__icontains=team_param)

        serializer = self.get_serializer(result, many=True)

        return Response(serializer.data)



class TeamViewSet(viewsets.ModelViewSet):
    
    serializer_class = TeamSerializer
    queryset = Team.objects.all()

class SeasonViewSet(viewsets.ModelViewSet):
    
    serializer_class = SeasonSerializer
    queryset = Team.objects.all()

