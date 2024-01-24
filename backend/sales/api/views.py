from rest_framework import viewsets

from ..models import Quote
from .serializers import QuoteSerializer


class DynamicDepthViewSet(viewsets.ModelViewSet):
    def get_serializer_context(self):
        context = super().get_serializer_context()
        depth = 0
        try:
            depth = int(self.request.query_params.get("depth", 0))
        except ValueError:
            pass  # Ignore non-numeric parameters and keep default 0 depth

        context["depth"] = depth

        return context


class QuoteViewSet(DynamicDepthViewSet):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer
