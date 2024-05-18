# Generated by Django 5.0.3 on 2024-05-18 09:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users_tutorial", "0003_trafficinfo_icon"),
    ]

    operations = [
        migrations.CreateModel(
            name="TrafficLight",
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
                (
                    "orientation",
                    models.CharField(
                        choices=[
                            ("N", "N"),
                            ("NE", "NE"),
                            ("E", "E"),
                            ("SE", "SE"),
                            ("S", "S"),
                            ("SV", "SV"),
                            ("V", "V"),
                            ("NV", "NV"),
                        ],
                        default="N",
                        max_length=3,
                    ),
                ),
                ("functioning", models.BooleanField(default=False)),
                ("function_error", models.CharField(max_length=100)),
                (
                    "program",
                    models.CharField(
                        choices=[("MANUAL", "MANUAL"), ("AUTO", "AUTO")],
                        default="MANUAL",
                        max_length=10,
                    ),
                ),
                ("time_red", models.IntegerField()),
                ("time_yellow", models.IntegerField()),
                ("time_green", models.IntegerField()),
                ("error", models.CharField(max_length=100)),
                ("ariaLabel", models.CharField(max_length=100)),
                ("title", models.CharField(max_length=100)),
            ],
        ),
    ]