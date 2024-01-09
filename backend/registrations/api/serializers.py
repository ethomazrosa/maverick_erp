from rest_framework import serializers

from ..models import Customer, Product, ResponsibleCompany, Service


class ResponsibleCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = ResponsibleCompany
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"
