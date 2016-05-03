from django.shortcuts import render, get_object_or_404
from .models import MealOption, Restaurant
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

def index(request):
	# try to get a random meal option
	meal = MealOption.objects.order_by('?').first()
	if (meal):
		restaurant = meal.restaurant
	# if there are no meals, try to get a restaurant
	else:
		restaurant = Restaurant.objects.order_by('?').first()

	return render(request, 'lunch/index.html', {
    	'meal_option': meal,
    	'restaurant': restaurant
    	})

def restaurant_detail(request, restaurant_id):
	restaurant = get_object_or_404(Restaurant, pk=restaurant_id)
	return render(request, 'lunch/restaurant.html', {
		'restaurant': restaurant,
		'suggestion': MealOption.get_random()
		})

def add_restaurant(request):
	if ('restaurant' in request.POST and 'facebook_id' in request.POST):
		restaurant = Restaurant(name=request.POST['restaurant'], facebook_id=request.POST['facebook_id'])
		restaurant.save()
		return HttpResponseRedirect(reverse('lunch:index'))
	else:
		return render(request, 'lunch/add_restaurant.html')