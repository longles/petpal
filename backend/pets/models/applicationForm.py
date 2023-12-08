from django.db import models


class ApplicationForm(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    shelter = models.ForeignKey("accounts.PetShelter", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)