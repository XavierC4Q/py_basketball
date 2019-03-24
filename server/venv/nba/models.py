from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField

from .choices import NBA_TEAMS, HAND, PLAYER_POSITIONS


class CustomUser(AbstractUser):

    first_name = models.CharField(max_length=128, blank=False, null=False)
    last_name = models.CharField(max_length=128, blank=False, null=False)
    favorite_team = models.CharField(max_length=25, default='NONE', choices=NBA_TEAMS)

    def __str__(self):
        return '%s %s' % (self.first_name, self.last_name)

    @property
    def full_name(self):
        return self.first_name + ' ' + self.last_name

class Team(models.Model):
    
    name = models.CharField(max_length=150, default='NONE', choices=NBA_TEAMS)
    championships = models.IntegerField(default=0)
    owner = models.CharField(max_length=150, blank=False, null=False)
    
    def __str__(self):
        return self.name


class Player(models.Model):

    team = models.CharField(max_length=25, default='NONE', choices=NBA_TEAMS)
    name = models.CharField(max_length=150, null=False, blank=False)
    college = models.CharField(max_length=100, blank=True, null=True)
    height = models.CharField(max_length=10, blank=False, null=False)
    weight = models.CharField(max_length=10, blank=False, null=False)
    wingspan = models.CharField(max_length=10, blank=False, null=False)
    jersey_number = models.CharField(max_length=2, default=99)
    shooting_hand = models.CharField(max_length=5, default='RIGHT', choices=HAND)
    position = models.CharField(max_length=16, default='PG', choices=PLAYER_POSITIONS)
    played_for = ArrayField(
        models.CharField(max_length=25, default='NONE', choices=NBA_TEAMS), default=list
    )

    def __str__(self):
        return '%s : %s' % (self.name, self.team)


class Season(models.Model):

    year = models.CharField(max_length=20, blank=False, null=False)
    champion = models.CharField(max_length=25, blank=True, null=False, choices=NBA_TEAMS)
    mvp = models.ForeignKey(Player, related_name='league_mvp', on_delete=models.CASCADE)
    f_mvp = models.ForeignKey(Player, related_name='finals_mvp', on_delete=models.CASCADE)
    d_poy = models.ForeignKey(Player, related_name='defensive_player_of_the_year', on_delete=models.CASCADE)
    sixth_man = models.ForeignKey(Player, related_name='sixth_man_of_the_year', on_delete=models.CASCADE)
    m_improv = models.ForeignKey(Player, related_name='most_improved', on_delete=models.CASCADE)
    all_mvp = models.ForeignKey(Player, related_name='all_star_mvp', on_delete=models.CASCADE)

    def __str__(self):
        return self.year



