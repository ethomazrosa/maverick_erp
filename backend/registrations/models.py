from django.db import models
from django.utils.translation import gettext_lazy as _


# Create your models here.
class Address(models.Model):
    class State(models.TextChoices):
        AC = "AC", _("Acre")
        AL = "AL", _("Alagoas")
        AP = "AP", _("Amapá")
        AM = "AM", _("Amazonas")
        BA = "BA", _("Bahia")
        CE = "CE", _("Ceará")
        DF = "DF", _("Distrito Federal")
        ES = "ES", _("Espírito Santo")
        GO = "GO", _("Goiás")
        MA = "MA", _("Maranhão")
        MT = "MT", _("Mato Grosso")
        MS = "MS", _("Mato Grosso do Sul")
        MG = "MG", _("Minas Gerais")
        PA = "PA", _("Pará")
        PB = "PB", _("Paraíba")
        PR = "PR", _("Paraná")
        PE = "PE", _("Pernambuco")
        PI = "PI", _("Piauí")
        RJ = "RJ", _("Rio de Janeiro")
        RN = "RN", _("Rio Grande do Norte")
        RS = "RS", _("Rio Grande do Sul")
        RO = "RO", _("Rondônia")
        RR = "RR", _("Roraima")
        SC = "SC", _("Santa Catarina")
        SP = "SP", _("São Paulo")
        SE = "SE", _("Sergipe")
        TO = "TO", _("Tocantins")

    address_name = models.CharField(max_length=250)
    address_number = models.PositiveIntegerField()
    address_complement = models.CharField(max_length=250, blank=True, null=True)
    neighborhood = models.CharField(max_length=250)
    city = models.CharField(max_length=250)
    state = models.CharField(max_length=2, choices=State.choices)
    postal_code = models.PositiveIntegerField()

    class Meta:
        abstract = True


class ContactInformation(models.Model):
    email = models.EmailField()
    phone = models.PositiveBigIntegerField(blank=True, null=True)
    mobile_phone = models.PositiveBigIntegerField()

    class Meta:
        abstract = True


class ResponsibleCompany(Address, ContactInformation):
    class Meta:
        verbose_name = "Empresa Responsável"
        verbose_name_plural = "Empresas Responsáveis"

    identification_number = models.PositiveBigIntegerField(unique=True)
    company_name = models.CharField(max_length=250)
    brand_name = models.CharField(max_length=250)
    municipal_registration = models.PositiveBigIntegerField(blank=True, null=True)
    state_registration = models.PositiveBigIntegerField(blank=True, null=True)
    color = models.CharField(max_length=10)
    logo = models.ImageField(upload_to="company_logos/%Y/%m/%d/", blank=True, null=True)

    def __str__(self) -> str:
        return self.brand_name


class Product(models.Model):
    class Meta:
        verbose_name = "Produto"

    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(max_length=1000)
    ncm_naladish = models.PositiveIntegerField(blank=True, null=True)
    o_cst = models.PositiveSmallIntegerField(blank=True, null=True)
    cfop = models.PositiveSmallIntegerField(blank=True, null=True)
    measurement_unit = models.CharField(max_length=25, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    profit_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    icms_base_calc = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )
    icms_price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )
    icms_rate = models.DecimalField(
        max_digits=5, decimal_places=2, blank=True, null=True
    )
    ipi_price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )
    ipi_rate = models.DecimalField(
        max_digits=5, decimal_places=2, blank=True, null=True
    )

    def __str__(self) -> str:
        return self.name


class Service(models.Model):
    class Meta:
        verbose_name = "Serviço"

    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(max_length=1000)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self) -> str:
        return self.name


class Customer(Address, ContactInformation):
    class Meta:
        verbose_name = "Cliente"

    class PersonType(models.TextChoices):
        PF = "PF", _("Pessoa Física")
        PJ = "PJ", _("Pessoa Jurídica")

    person_type = models.CharField(
        max_length=2, choices=PersonType.choices, default=PersonType.PJ
    )
    identification_number = models.PositiveBigIntegerField(unique=True)
    name = models.CharField(max_length=250, blank=True, null=True)
    company_name = models.CharField(max_length=250, blank=True, null=True)
    brand_name = models.CharField(max_length=250, blank=True, null=True)
    municipal_registration = models.PositiveBigIntegerField(blank=True, null=True)
    state_registration = models.PositiveBigIntegerField(blank=True, null=True)

    def __str__(self) -> str:
        if self.person_type == "PF":
            return self.name
        else:
            return self.brand_name
