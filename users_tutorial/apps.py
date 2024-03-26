from django.apps import AppConfig


class UsersTutorialConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "users_tutorial"

    def ready(self):
        import users_tutorial.signals