from rest_framework import viewsets

from ..models import Quote, QuoteProduct, QuoteService
from .serializers import QuoteSerializer, QuoteProductSerializer, QuoteServiceSerializer


class QuoteViewSet(viewsets.ModelViewSet):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer
