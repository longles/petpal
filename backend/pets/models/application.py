from django.db import models


class Application(models.Model):
    class Status(models.IntegerChoices):
        PENDING = 1, 'Pending'
        APPROVED = 2, 'Approved'
        DENIED = 3, 'Denied'
        WITHDRAWN = 4, 'Withdrawn'


    pet = models.ForeignKey("Pet", on_delete=models.CASCADE)
    applicant = models.ForeignKey("accounts.PetSeeker", on_delete=models.CASCADE, related_name="applications")

    status = models.PositiveSmallIntegerField(choices=Status.choices, default=Status.PENDING)
    last_updated = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)