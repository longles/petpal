from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class User(AbstractUser):
    # content type set-up
    user_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True, blank=True)
    user_id = models.PositiveIntegerField(null=True, blank=True)
    user_object = GenericForeignKey('user_type', 'user_id')

    class Meta:
        unique_together = ('user_type', 'user_id')

    def __str__(self):
        return self.username

    def is_user(self, user_type, pk):
        return self.user_type.model == user_type and self.user_id == pk
