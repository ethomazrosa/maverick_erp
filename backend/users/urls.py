from django.urls import include, path
from rest_framework import routers

from .api.views import CurrentUserViewSet, ProfileViewSet

router = routers.DefaultRouter()
router.register("profiles", ProfileViewSet)
router.register("current_user", CurrentUserViewSet, basename="current_user")

urlpatterns = [
    path("", include(router.urls)),
]
