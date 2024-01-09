from django.contrib.auth.models import User
from django.db import models

# Models

class Profile(models.Model):
    employee = models.OneToOneField(User, on_delete=models.CASCADE)
    identification_number = models.PositiveIntegerField(null=True, blank=True)
    phone_number = models.PositiveIntegerField(null=True, blank=True)
    profile_picture = models.ImageField(
        upload_to="profile_pictures/%Y/%m/%d/", null=True, blank=True
    )

    def __str__(self) -> str:
        return f"Profile of {self.employee.username}"
