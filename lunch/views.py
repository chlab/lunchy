from django.shortcuts import render, get_object_or_404
from .models import MealOption, Restaurant
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

def index(request):
	# get a random meal option
	meal = MealOption.objects.order_by('?').first()
	return render(request, 'lunch/index.html', {
    	'meal_option': meal,
    	'restaurant': getattr(meal, 'restaurant', None)
    	})

def add_meal(request, restaurant_id):
	restaurant = get_object_or_404(Restaurant, pk=restaurant_id)
	suggestion = MealOption.get_random()
	return render(request, 'lunch/add_meal.html', {
		'restaurant': restaurant,
		'suggestion': suggestion
		})

def restaurant_detail(request, restaurant_id):
	restaurant = get_object_or_404(Restaurant, pk=restaurant_id)
	return render(request, 'lunch/restaurant.html', {'restaurant': restaurant})

def add_restaurant(request):
	if ('restaurant' in request.POST and 'facebook_id' in request.POST):
		restaurant = Restaurant(name=request.POST['restaurant'], facebook_id=request.POST['facebook_id'])
		restaurant.save()
		return HttpResponseRedirect(reverse('lunch:index'))
	else:
		return render(request, 'lunch/add_restaurant.html')