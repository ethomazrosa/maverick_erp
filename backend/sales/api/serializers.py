from rest_framework import serializers

from ..models import Quote, QuoteProduct, QuoteService


class QuoteProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteProduct
        exclude = ["quote"]


class QuoteServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteService
        exclude = ["quote"]


class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = "__all__"

    products = QuoteProductSerializer(many=True)
    services = QuoteServiceSerializer(many=True)

    def create(self, validated_data):
        products = validated_data.pop("products")
        services = validated_data.pop("services")
        quote = Quote.objects.create(**validated_data)
        for product in products:
            QuoteProduct.objects.create(quote=quote, **product)
        for service in services:
            QuoteService.objects.create(quote=quote, **service)
        return quote
