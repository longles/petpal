from rest_framework import serializers
from ..models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['content', 'link_id', 'notification_type', 'is_read', 'creation_time', 'user']
