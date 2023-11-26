from django.db.models.signals import post_delete
from django.dispatch import receiver

from ..models import ApplicationQuestion, QuestionResponse


@receiver(post_delete, sender=ApplicationQuestion)
def delete_application_question_object(sender, instance, using, **kwargs):
    instance.question_object.delete()


@receiver(post_delete, sender=QuestionResponse)
def delete_question_response_object(sender, instance, using, **kwargs):
    instance.response_object.delete()