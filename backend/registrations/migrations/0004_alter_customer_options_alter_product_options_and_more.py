# Generated by Django 5.0.1 on 2024-01-16 15:04

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("registrations", "0003_alter_product_profit_percentage"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="customer",
            options={"verbose_name": "Cliente"},
        ),
        migrations.AlterModelOptions(
            name="product",
            options={"verbose_name": "Produto"},
        ),
        migrations.AlterModelOptions(
            name="responsiblecompany",
            options={
                "verbose_name": "Empresa Responsável",
                "verbose_name_plural": "Empresas Responsáveis",
            },
        ),
        migrations.AlterModelOptions(
            name="service",
            options={"verbose_name": "Serviço"},
        ),
    ]
