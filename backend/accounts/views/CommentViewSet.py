from django.shortcuts import get_object_or_404, redirect
from django.urls import reverse
from rest_framework import viewsets, generics, permissions
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated

from accounts.models import User, PetShelter
from ..serializers import CommentSerializer
from ..models import Comment
from pets.models import Application,Pet
from django.contrib.contenttypes.models import ContentType
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


class ShelterCommentListCreate(generics.ListCreateAPIView):
    #permission_classes = (IsAuthenticated,)
    serializer_class = CommentSerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        return Comment.objects.filter(receiver_type__model="petshelter", receiver_id=pk).order_by("-timestamp")

    def perform_create(self, serializer):
        user = self.request.user
        pk = self.kwargs.get('pk')
        shelter = get_object_or_404(PetShelter, id=pk)
        serializer.save(sender=user,
                        receiver=shelter)

class ApplicationCommentListCreate(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CommentSerializer
    def get_queryset(self):
        pk = self.kwargs['pk']
        application = get_object_or_404(Application, id=pk)
        user = self.request.user

        if user.is_user('petseeker', application.applicant_id) or user.is_user('petshelter', application.pet.shelter_id):
            return Comment.objects.filter(receiver_type__model="application", receiver_id=pk).order_by("-timestamp")
        else:
            raise PermissionDenied("You do not have permission to view this application.")
    
    def perform_create(self, serializer):
        user = self.request.user
        application_id = self.kwargs.get('pk')
        application = get_object_or_404(Application, id=application_id)

        if user.is_user('petseeker', application.applicant_id) or user.is_user('petshelter', application.pet.shelter_id):
            serializer.save(sender=user,
                            receiver_type=ContentType.objects.get(model="application"),
                            receiver_id=application_id,
                            receiver=application)
        else:
            raise PermissionDenied("You do not have the permission to comment.")
        