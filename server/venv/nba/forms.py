from django.contrib import admin 
from .models import CustomUser

class CustomUserAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, { 'fields': ['first_name', 'last_name', 'username'] }),
        ('Favorite Team', { 'fields': ['favorite_team'] })
    ]

    list_display = ('username', 'first_name', 'last_name','favorite_team')