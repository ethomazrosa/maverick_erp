from django.db import models
from django.utils.translation import gettext_lazy as _


# Create your models here.
class Quote(models.Model):
    class Meta:
        verbose_name = "Orçamento"

    class Status(models.TextChoices):
        DRAFT = "DRAFT", _("Rascunho")
        PENDING = "PENDING", _("Pendente")
        SENT = "SENT", _("Enviado")
        ACCEPTED = "ACCEPTED", _("Aceito")

    contact = models.CharField(max_length=250, blank=True, null=True)
    seller = models.CharField(max_length=250)
    date = models.DateField()
    expiration_date = models.DateField()
    customer = models.ForeignKey("registrations.Customer", on_delete=models.RESTRICT)
    service_location = models.ForeignKey(
        "registrations.Customer",
        on_delete=models.RESTRICT,
        related_name="service_locations",
        blank=True,
        null=True,
    )
    service_description = models.CharField(max_length=1000)
    payment_method = models.CharField(max_length=1000)
    deadline = models.CharField(max_length=1000)
    warranty = models.CharField(max_length=1000)
    status = models.CharField(max_length=10, choices=Status.choices)

    def __str__(self) -> str:
        return f"Orçamento {str(self.id).rjust(4, '0')}"


class QuoteProduct(models.Model):
    class Meta:
        verbose_name = "Orçamentos/Produto"
        constraints = [
            models.UniqueConstraint(fields=["quote", "number"], name="product_number")
        ]

    quote = models.ForeignKey(Quote, related_name="products", on_delete=models.CASCADE)
    number = models.PositiveSmallIntegerField()
    quantity = models.PositiveSmallIntegerField()
    product = models.ForeignKey("registrations.Product", on_delete=models.RESTRICT)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self) -> str:
        return f"Orçamento: {str(self.quote.id).rjust(4, '0')} Item: {str(self.number).rjust(3, '0')}"


class QuoteService(models.Model):
    class Meta:
        verbose_name = "Orçamentos/Serviço"
        constraints = [
            models.UniqueConstraint(fields=["quote", "number"], name="service_number")
        ]

    quote = models.ForeignKey(Quote, related_name="services", on_delete=models.CASCADE)
    number = models.PositiveSmallIntegerField()
    quantity = models.PositiveSmallIntegerField()
    service = models.ForeignKey("registrations.Service", on_delete=models.RESTRICT)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self) -> str:
        return f"Orçamento: {str(self.quote.id).rjust(4, '0')} Serviço: {str(self.number).rjust(3, '0')}"
