from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.core.validators import MaxValueValidator


class Comment(models.Model):
    limit = models.Q(app_label='pets', model='application') | models.Q(app_label='accounts', model='petshelter')
    receiver_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, limit_choices_to=limit)
    receiver_id = models.PositiveIntegerField()
    receiver = GenericForeignKey("receiver_type", "receiver_id")
    sender = models.ForeignKey('User', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    rating = models.PositiveIntegerField(validators=[MaxValueValidator(5)], null=True, blank=True)
