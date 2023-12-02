from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.urls import reverse

from ..models import Notification
from ..serializers import NotificationSerializer, NotificationUpdateSerializer

class NotificationViewset(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    # filter the notifications by appending ?is_read=true or ?is_read=false to the URL
    filterset_fields = ['is_read']

    permission_classes_by_action = {'list': [IsAuthenticated],
                                    'retrieve': [IsAuthenticated],
                                    'create': [AllowAny],
                                    'partial_update': [IsAuthenticated],
                                    'update': [IsAuthenticated],
                                    'destroy': [IsAuthenticated]}

    # Get permission for each action
    def get_permissions(self):
        self.permission_classes = self.permission_classes_by_action[self.action]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == "partial_update" or self.action == "update":
            return NotificationUpdateSerializer
        else:
            return NotificationSerializer

    def get_queryset(self):
        return Notification.objects.filter(user_id=self.request.user.pk)

    # def update(self, request, *args, **kwargs):
    #     notification = self.get_object()

    #     # should only change from not_read to read
    #     if notification.is_read:
    #         return Response({"message": "Notification is already read."}, status=status.HTTP_400_BAD_REQUEST)

    #     if 'is_read' in request.data and request.data['is_read']:
    #         request.data = {"is_read": True}
    #         return super().update(request, *args, **kwargs)
    #     else:
    #         return Response({"message": "Notification status cannot be updated to read."},
    #                         status=status.HTTP_400_BAD_REQUEST)
