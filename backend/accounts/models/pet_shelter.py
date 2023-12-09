from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from .user import User


class PetShelter(models.Model):
    phone_num = models.CharField(max_length=15, null=True, blank=True)
    profile_pic = models.ImageField(upload_to='profile_pic/', null=True, blank=True)
    name = models.CharField(max_length=200, null=False, blank=False)
    mission = models.TextField(null=True, blank=True)
    about_us = models.TextField(null=True, blank=True)
    location = models.CharField(max_length=200, null=True, blank=True)

    user = GenericRelation(User, object_id_field='user_id', content_type_field='user_type', related_query_name="user")

    @property
    def account(self):
        return self.user.first()

    @account.setter
    def account(self, value):
        print(value)
        accountobj = self.user.first()
        if ('username' in value):
            accountobj.username = value['username']
        if ('email' in value):
            accountobj.email = value['email']
        if ('password' in value):
            accountobj.set_password(value['password'])
        accountobj.save()

    def __str__(self):
        return self.name
