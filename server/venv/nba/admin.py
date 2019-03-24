from __future__ import unicode_literals
from django.contrib import admin
from django.contrib.auth.models import Group

from .models import CustomUser, Player, Season, Team
from .forms import CustomUserAdmin

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Player)
admin.site.register(Team)
admin.site.unregister(Group)
