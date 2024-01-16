from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer

from ..models import Quote, QuoteProduct, QuoteService


class QuoteProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteProduct
        exclude = ["quote"]


class QuoteServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteService
        exclude = ["quote"]


class QuoteSerializer(WritableNestedModelSerializer):
    class Meta:
        model = Quote
        fields = "__all__"

    products = QuoteProductSerializer(many=True)
    services = QuoteServiceSerializer(many=True)
