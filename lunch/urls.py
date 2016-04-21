from django.conf.urls import url

from . import views

app_name = 'lunch'
urlpatterns = [
	# index /
    url(r'^$', views.index, name='index'),
    # /restaurant/<id>
    url(r'^restaurant/(?P<restaurant_id>[0-9]+)$', views.restaurant, name='restaurant'),
    # /restaurant/<id>/add
    url(r'^(?P<restaurant_id>[0-9]+)/add/$', views.add, name='add')
]
