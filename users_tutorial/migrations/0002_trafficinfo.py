# Generated by Django 5.0.3 on 2024-05-15 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users_tutorial", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="TrafficInfo",
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
                ("density", models.IntegerField()),
                ("med_speed", models.IntegerField()),
                ("lights", models.BooleanField(default=False)),
                ("cameras", models.BooleanField(default=False)),
                ("signs", models.BooleanField(default=False)),
                ("incidents", models.BooleanField(default=False)),
                ("accidents", models.BooleanField(default=False)),
                ("alerts", models.BooleanField(default=False)),
                ("alert_content", models.CharField(blank=True, max_length=255)),
                ("ariaLabel", models.CharField(max_length=100)),
                ("title", models.CharField(max_length=100)),
            ],
        ),
    ]