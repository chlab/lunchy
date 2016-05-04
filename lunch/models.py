from __future__ import unicode_literals

from django.db import models

class Restaurant(models.Model):
	facebook_id = models.BigIntegerField(unique=True, null=True)
	name = models.CharField(max_length=100)
	
	def __unicode__(self):
		return self.name

class MealOption(models.Model):
	restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
	name = models.CharField(max_length=45)
	created_at = models.DateTimeField(auto_now_add=True)

	def __unicode__(self):
		return self.name

	@staticmethod
	def get_random():
		return MealOption.objects.order_by('?').first()