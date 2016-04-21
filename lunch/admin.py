from django.contrib import admin

from .models import Restaurant, MealOption

admin.site.register(Restaurant)
admin.site.register(MealOption)