from .models import CustomUser, Player, Team, Season
from rest_framework import serializers

class CustomUserSerializer(serializers.ModelSerializer):

    full_name = serializers.ReadOnlyField()

    class Meta:
        model = CustomUser
        fields = ('pk', 'username', 'first_name', 'last_name', 'full_name','favorite_team')

class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields = '__all__'
        ordering = ['name']

class TeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team 
        fields = '__all__'
        ordering = ['name']

class SeasonSerializer(serializers.ModelSerializer):

    class Meta:
        model = Season
        fields = '__all__'
        ordering = ['year']

