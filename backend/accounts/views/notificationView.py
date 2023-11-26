from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.urls import reverse

from ..models import Notification
from ..serializers.notificationSerializer import NotificationSerializer


class NotificationListCreate(generics.ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


class NotificationRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    # filter the notifications by appending ?is_read=true or ?is_read=false to the URL
    filterset_fields = ['is_read']
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        notification = self.get_object()

        # should only change from not_read to read
        if notification.is_read:
            return Response({"message": "Notification is already read."}, status=status.HTTP_400_BAD_REQUEST)

        if 'is_read' in request.data and request.data['is_read']:
            return super().update(request, *args, **kwargs)
        else:
            return Response({"message": "Notification status cannot be updated to read."},
                            status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(user=user).order_by('-creation_time')

    def retrieve(self, request, *args, **kwargs):
        notif_type = request.data.get('notification_type')
        link_id = request.data.get('link_id')

        if not notif_type:
            return Response({"message": "Notification type retrieved unsuccessfully."},
                            status=status.HTTP_400_BAD_REQUEST)
        if not link_id:
            return Response({"message": "link id to comment/application not found"},
                            status=status.HTTP_400_BAD_REQUEST)

        if notif_type == 'shelter_comment':
            return reverse('shelter_comment_list_create', args=[link_id])
        elif notif_type in ['application_creation', 'status_update']:
            return reverse('application-detail', args=[link_id])
        else:
            return None
