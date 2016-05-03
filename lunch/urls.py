from django.conf.urls import url

from . import views

app_name = 'lunch'
urlpatterns = [
	# index /
    url(r'^$', views.index, name='index'),
    # /restaurant/add
    url(r'^restaurant/add$', views.add_restaurant, name='add_restaurant'),
    # /restaurant/<id>
    url(r'^restaurant/(?P<restaurant_id>[0-9]+)$', views.restaurant_detail, name='restaurant_detail')
]
