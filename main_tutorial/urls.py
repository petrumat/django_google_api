from django.urls import path
from .import views

app_name = "main_tutorial"

urlpatterns = [
    path('route', views.route, name="route"),
    path('map', views.map, name="map"),
    path('traffic_info', views.traffic_info, name="traffic_info"),
]