from django.db import models


class ApplicationForm(models.Model):
    shelter = models.ForeignKey("accounts.PetShelter", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)