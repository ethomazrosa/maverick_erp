# Generated by Django 5.0.1 on 2024-01-09 17:47

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Customer",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("address_name", models.CharField(max_length=250)),
                ("address_number", models.SmallIntegerField()),
                (
                    "address_complement",
                    models.CharField(blank=True, max_length=250, null=True),
                ),
                ("neighborhood", models.CharField(max_length=250)),
                ("city", models.CharField(max_length=250)),
                (
                    "state",
                    models.CharField(
                        choices=[
                            ("AC", "Acre"),
                            ("AL", "Alagoas"),
                            ("AP", "Amapá"),
                            ("AM", "Amazonas"),
                            ("BA", "Bahia"),
                            ("CE", "Ceará"),
                            ("DF", "Distrito Federal"),
                            ("ES", "Espírito Santo"),
                            ("GO", "Goiás"),
                            ("MA", "Maranhão"),
                            ("MT", "Mato Grosso"),
                            ("MS", "Mato Grosso do Sul"),
                            ("MG", "Minas Gerais"),
                            ("PA", "Pará"),
                            ("PB", "Paraíba"),
                            ("PR", "Paraná"),
                            ("PE", "Pernambuco"),
                            ("PI", "Piauí"),
                            ("RJ", "Rio de Janeiro"),
                            ("RN", "Rio Grande do Norte"),
                            ("RS", "Rio Grande do Sul"),
                            ("RO", "Rondônia"),
                            ("RR", "Roraima"),
                            ("SC", "Santa Catarina"),
                            ("SP", "São Paulo"),
                            ("SE", "Sergipe"),
                            ("TO", "Tocantins"),
                        ],
                        max_length=2,
                    ),
                ),
                ("postal_code", models.SmallIntegerField()),
                ("email", models.EmailField(max_length=254)),
                ("phone", models.SmallIntegerField(blank=True, null=True)),
                ("mobile_phone", models.SmallIntegerField()),
                (
                    "person_type",
                    models.CharField(
                        choices=[("PF", "Pessoa Física"), ("PJ", "Pessoa Jurídica")],
                        default="PJ",
                        max_length=2,
                    ),
                ),
                (
                    "identification_number",
                    models.PositiveSmallIntegerField(unique=True),
                ),
                ("name", models.CharField(blank=True, max_length=250, null=True)),
                (
                    "company_name",
                    models.CharField(blank=True, max_length=250, null=True),
                ),
                ("brand_name", models.CharField(blank=True, max_length=250, null=True)),
                (
                    "municipal_registration",
                    models.PositiveSmallIntegerField(blank=True, null=True),
                ),
                (
                    "state_registration",
                    models.PositiveSmallIntegerField(blank=True, null=True),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50, unique=True)),
                ("description", models.TextField(max_length=1000)),
                (
                    "ncm_naladish",
                    models.PositiveSmallIntegerField(blank=True, null=True),
                ),
                ("o_cst", models.PositiveSmallIntegerField(blank=True, null=True)),
                ("cfop", models.PositiveSmallIntegerField(blank=True, null=True)),
                (
                    "measurement_unit",
                    models.CharField(blank=True, max_length=25, null=True),
                ),
                ("price", models.DecimalField(decimal_places=2, max_digits=10)),
                (
                    "profit_percentage",
                    models.DecimalField(decimal_places=4, max_digits=7),
                ),
                (
                    "icms_base_calc",
                    models.DecimalField(
                        blank=True, decimal_places=2, max_digits=10, null=True
                    ),
                ),
                (
                    "icms_price",
                    models.DecimalField(
                        blank=True, decimal_places=2, max_digits=10, null=True
                    ),
                ),
                (
                    "icms_rate",
                    models.DecimalField(
                        blank=True, decimal_places=2, max_digits=5, null=True
                    ),
                ),
                (
                    "ipi_price",
                    models.DecimalField(
                        blank=True, decimal_places=2, max_digits=10, null=True
                    ),
                ),
                (
                    "ipi_rate",
                    models.DecimalField(
                        blank=True, decimal_places=2, max_digits=5, null=True
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ResponsibleCompany",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("address_name", models.CharField(max_length=250)),
                ("address_number", models.SmallIntegerField()),
                (
                    "address_complement",
                    models.CharField(blank=True, max_length=250, null=True),
                ),
                ("neighborhood", models.CharField(max_length=250)),
                ("city", models.CharField(max_length=250)),
                (
                    "state",
                    models.CharField(
                        choices=[
                            ("AC", "Acre"),
                            ("AL", "Alagoas"),
                            ("AP", "Amapá"),
                            ("AM", "Amazonas"),
                            ("BA", "Bahia"),
                            ("CE", "Ceará"),
                            ("DF", "Distrito Federal"),
                            ("ES", "Espírito Santo"),
                            ("GO", "Goiás"),
                            ("MA", "Maranhão"),
                            ("MT", "Mato Grosso"),
                            ("MS", "Mato Grosso do Sul"),
                            ("MG", "Minas Gerais"),
                            ("PA", "Pará"),
                            ("PB", "Paraíba"),
                            ("PR", "Paraná"),
                            ("PE", "Pernambuco"),
                            ("PI", "Piauí"),
                            ("RJ", "Rio de Janeiro"),
                            ("RN", "Rio Grande do Norte"),
                            ("RS", "Rio Grande do Sul"),
                            ("RO", "Rondônia"),
                            ("RR", "Roraima"),
                            ("SC", "Santa Catarina"),
                            ("SP", "São Paulo"),
                            ("SE", "Sergipe"),
                            ("TO", "Tocantins"),
                        ],
                        max_length=2,
                    ),
                ),
                ("postal_code", models.SmallIntegerField()),
                ("email", models.EmailField(max_length=254)),
                ("phone", models.SmallIntegerField(blank=True, null=True)),
                ("mobile_phone", models.SmallIntegerField()),
                (
                    "identification_number",
                    models.PositiveSmallIntegerField(unique=True),
                ),
                ("company_name", models.CharField(max_length=250)),
                ("brand_name", models.CharField(max_length=250)),
                (
                    "municipal_registration",
                    models.PositiveSmallIntegerField(blank=True, null=True),
                ),
                (
                    "state_registration",
                    models.PositiveSmallIntegerField(blank=True, null=True),
                ),
                ("color", models.CharField(max_length=10)),
                (
                    "logo",
                    models.ImageField(
                        blank=True, null=True, upload_to="company_logos/%Y/%m/%d/"
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Service",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50, unique=True)),
                ("description", models.TextField(max_length=1000)),
                ("price", models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
    ]
