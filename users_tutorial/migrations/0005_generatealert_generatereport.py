# Generated by Django 5.0.3 on 2024-05-18 10:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users_tutorial", "0004_trafficlight"),
    ]

    operations = [
        migrations.CreateModel(
            name="GenerateAlert",
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
                ("timestamp", models.DateTimeField(auto_now_add=True)),
                ("updated", models.DateTimeField(auto_now=True)),
                ("lat", models.FloatField()),
                ("lng", models.FloatField()),
                ("zone", models.CharField(max_length=100)),
                ("speed", models.FloatField()),
                ("alert", models.CharField(max_length=100)),
                ("content", models.CharField(max_length=300)),
                ("ariaLabel", models.CharField(max_length=100)),
                ("title", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="GenerateReport",
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
                ("timestamp", models.DateTimeField(auto_now_add=True)),
                ("updated", models.DateTimeField(auto_now=True)),
                ("lat", models.FloatField()),
                ("lng", models.FloatField()),
                ("zone", models.CharField(max_length=100)),
                ("link", models.URLField()),
                ("content", models.CharField(max_length=300)),
                ("ariaLabel", models.CharField(max_length=100)),
                ("title", models.CharField(max_length=100)),
            ],
        ),
    ]