from django.contrib import admin

from .models import Customer, Product, ResponsibleCompany, Service

# Register your models here.
admin.site.register(ResponsibleCompany)
admin.site.register(Product)
admin.site.register(Service)
admin.site.register(Customer)
