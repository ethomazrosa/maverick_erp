from django.urls import include, path
from rest_framework import routers

from .api.views import QuoteViewSet

router = routers.DefaultRouter()
router.register("quotes", QuoteViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
