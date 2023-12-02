from django.db import models


class Notification(models.Model):
    content = models.TextField()
    # redirect_url = models.TextField()
    link_id = models.IntegerField(null=False, blank=False)
    notification_type = models.TextField(null=False, blank=False)
    is_read = models.BooleanField(null=False, blank=False, default=False)
    creation_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('User', on_delete=models.CASCADE)
