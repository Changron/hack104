from django.urls import path

from . import views

urlpatterns = [
    path('', views.maps, name='maps'),
    path('chats', views.chats, name='chats'),
    path('chats-with-maps', views.chats_with_maps, name='chats-with-maps'),
]