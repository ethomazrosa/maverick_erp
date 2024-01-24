from django.contrib import admin

from .models import Quote, QuoteProduct, QuoteService

# Register your models here.
admin.site.register(Quote)
admin.site.register(QuoteProduct)
admin.site.register(QuoteService)
