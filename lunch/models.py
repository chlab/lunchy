from __future__ import unicode_literals

from django.db import models

class Restaurant
	lunchgate_id = models.IntegerField()

class MealOption(models.Model):
	restaurant_id = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
	name = models.CharField(max_length=45)
	created_at = models.DateTimeField(auto_now_add=True)