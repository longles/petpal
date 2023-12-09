from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.relations import PrimaryKeyRelatedField

from pets.models import Application
from pets.serializers import ApplicationSerializer
from .userSerializer import PetShelterSerializer
from ..models import Comment, PetShelter, User
from django.db import models


class CommentObjectRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        rep = ""
        if isinstance(value, Application):
            rep = "application:" + str(value.pk)
        elif isinstance(value, PetShelter):
            rep = "petshelter:" + str(value.pk)
        else:
            raise Exception('Unexpected type of receiver object')
        return rep

class CommentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class CommentSerializer(serializers.ModelSerializer):
    receiver = CommentObjectRelatedField(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'receiver', 'content', 'sender', 'timestamp')
        read_only_fields = ('sender', 'timestamp', 'receiver')

class ShelterCommentSerializer(serializers.ModelSerializer):
    receiver = CommentObjectRelatedField(read_only=True)
    sender = CommentUserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'receiver', 'content', 'sender', 'timestamp', 'rating')
        read_only_fields = ('sender', 'timestamp', 'receiver')