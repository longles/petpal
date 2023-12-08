from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from .user import User


class PetShelter(models.Model):
    phone_num = models.CharField(max_length=15, null=True, blank=True)
    profile_pic = models.ImageField(upload_to='profile_pic/', null=True, blank=True)
    shelter_name = models.CharField(max_length=200, null=True, blank=True)
    mission = models.TextField(null=True, blank=True)
    about_us = models.TextField(null=True, blank=True)
    location = models.CharField(max_length=200, null=True, blank=True)
    contact_email = models.CharField(max_length=200, null=True, blank=True)

    user = GenericRelation(User, object_id_field='user_id', content_type_field='user_type', related_query_name="user")

    @property
    def account_id(self):
        return self.user.first()

    def __str__(self):
        return self.shelter_name
