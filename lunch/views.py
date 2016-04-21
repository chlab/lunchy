from django.shortcuts import render, get_object_or_404
from .models import MealOption, Restaurant

def index(request):
	# get a random meal option
	meal = MealOption.objects.order_by('?').first()
	return render(request, 'lunch/index.html', {
    	'meal_option': meal,
    	'restaurant': meal.restaurant
    	})

def add(request, restaurant_id):
	restaurant = get_object_or_404(Restaurant, pk=restaurant_id)
	return render(request, 'lunch/add.html', {'restaurant': restaurant})

def restaurant(request, restaurant_id):
	restaurant = get_object_or_404(Restaurant, pk=restaurant_id)
	return render(request, 'lunch/restaurant.html', {'restaurant': restaurant})	