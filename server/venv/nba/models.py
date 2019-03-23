from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractUser

from .teams import NBA_TEAMS


class CustomUser(AbstractUser):

    first_name = models.CharField(max_length=128, blank=False, null=False)
    last_name = models.CharField(max_length=128, blank=False, null=False)
    favorite_team = models.CharField(
        max_length=25, 
        blank=False, 
        null=False,
        default='NONE',
        choices=NBA_TEAMS)

    def __str__(self):
        return '%s %s' % (self.first_name, self.last_name)

    @property
    def full_name(self):
        return self.first_name + ' ' + self.last_name

class Player(models.Model):

    team = models.CharField( 
        max_length=25, 
        blank=False, 
        null=False,
        default='NONE',
        choices=NBA_TEAMS)
    name = models.CharField(max_length=150, null=False, blank=False)
    college = models.CharField(max_length=100, blank=True, null=True)
    height = models.CharField(max_length=10, blank=False, null=False)
    weight = models.CharField(max_length=10, blank=False, null=False)
    wingspan = models.CharField(max_length=10, blank=False, null=False)

    def __str__(self):
        return '%s : %s' % (self.name, self.team)

class BaseStat(models.Model):

    player = models.ForeignKey('Player', on_delete=models.CASCADE)
    ppg = models.CharField(max_length=10, default='0.00', null=False, blank=False)
    astpg = models.CharField(max_length=10, default='0.00', null=False, blank=False)
    stlpg = models.CharField(max_length=10, default='0.00', null=False, blank=False)
    blkpg = models.CharField(max_length=10, default='0.00', null=False, blank=False)
    reboundpg = models.CharField(max_length=10, default='0.00', null=False, blank=False)

    def __str__(self):
        player_name = self.player['name']
        return 'Base Stats for %s' % (player_name)


class Team(models.Model):
    
    name = models.CharField(
        max_length=150, 
        blank=False, 
        null=False, 
        default='NONE',
        choices=NBA_TEAMS)
    championships = models.IntegerField(default=0)
    owner = models.CharField(max_length=150, blank=False, null=False)
    

    def __str__(self):
        return self.name



