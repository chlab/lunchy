from django.shortcuts import render, get_object_or_404
from .models import MealOption, Restaurant
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

def index(request):
	# get a random restaurant
	restaurant = Restaurant.objects.order_by('?').first()
	# try to get a random meal, otherwise we'll just say "something" from <restaurant>
	if (restaurant):
		meal = restaurant.mealoption_set.order_by('?').first()
	else:
		meal = None

	return render(request, 'lunch/index.html', {
    	'meal_option': meal,
    	'restaurant': restaurant
    	})

def restaurant_detail(request, restaurant_id):
	restaurant = get_object_or_404(Restaurant, pk=restaurant_id)

	# save meal option
	if ('meal_option' in request.POST):
		restaurant.mealoption_set.create(name=request.POST['meal_option'])
		return HttpResponseRedirect(reverse('lunch:restaurant_detail', args=(restaurant_id)))
		
	return render(request, 'lunch/restaurant.html', {
		'restaurant': restaurant,
		'suggestion': MealOption.get_random()
		})

# todo: check for facebook_id or set to null
def add_restaurant(request):
	# save restaurant and redirect to index
	if ('restaurant' in request.POST and 'facebook_id' in request.POST):
		restaurant = Restaurant(name=request.POST['restaurant'], facebook_id=request.POST['facebook_id'])
		restaurant.save()
		return HttpResponseRedirect(reverse('lunch:index'))
	else:
		return render(request, 'lunch/add_restaurant.html')