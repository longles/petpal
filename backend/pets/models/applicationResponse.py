from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType

from .applicationQuestion import QuestionType


class TextareaResponse(models.Model):
    type = models.PositiveSmallIntegerField(choices=QuestionType.choices, default=QuestionType.TEXTAREA)
    response = models.TextField()
    question = GenericRelation("QuestionResponse", object_id_field='object_id', content_type_field='response_type')

    @property
    def first_question(self):
        return self.question.first()


class DropdownResponse(models.Model):
    type = models.PositiveSmallIntegerField(choices=QuestionType.choices, default=QuestionType.DROPDOWN)
    response = models.JSONField()
    question = GenericRelation("QuestionResponse", object_id_field='object_id', content_type_field='response_type')

    @property
    def first_question(self):
        return self.question.first()


class RadioResponse(models.Model):
    type = models.PositiveSmallIntegerField(choices=QuestionType.choices, default=QuestionType.RADIO)
    response = models.JSONField()
    question = GenericRelation("QuestionResponse", object_id_field='object_id', content_type_field='response_type')

    @property
    def first_question(self):
        return self.question.first()


class CheckboxResponse(models.Model):
    type = models.PositiveSmallIntegerField(choices=QuestionType.choices, default=QuestionType.CHECKBOX)
    response = models.JSONField()
    question = GenericRelation("QuestionResponse", object_id_field='object_id', content_type_field='response_type')

    @property
    def first_question(self):
        return self.question.first()


class FileResponse(models.Model):
    type = models.PositiveSmallIntegerField(choices=QuestionType.choices, default=QuestionType.FILE)
    response = models.FileField(upload_to='files/')
    question = GenericRelation("QuestionResponse", object_id_field='object_id', content_type_field='response_type')

    @property
    def first_question(self):
        return self.question.first()


class QuestionResponse(models.Model):
    question = models.ForeignKey("ApplicationQuestion", on_delete=models.CASCADE)
    application = models.ForeignKey("Application", on_delete=models.CASCADE, related_name='responses')

    response_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    response_object = GenericForeignKey('response_type', 'object_id')

    class Meta:
        unique_together = ('response_type', 'object_id')
