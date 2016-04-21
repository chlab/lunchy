from __future__ import unicode_literals

from django.db import models

class Restaurant(models.Model):
	lunchgate_id = models.IntegerField()
	def __str__(self):
		return str(self.lunchgate_id)

class MealOption(models.Model):
	restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
	name = models.CharField(max_length=45)
	created_at = models.DateTimeField(auto_now_add=True)
	def __str__(self):
		return self.name

	@staticmethod
	def get_random():
		return MealOption.objects.order_by('?').first()