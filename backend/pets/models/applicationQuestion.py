from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType


class QuestionType(models.IntegerChoices):
        TEXTAREA = 1, 'Textarea'
        DROPDOWN = 2, 'Dropdown'
        RADIO = 3, 'Radio'
        CHECKBOX = 4, 'Checkbox'
        FILE = 5, 'File'


class TextareaPrompt(models.Model):
    type = models.PositiveSmallIntegerField(choices=QuestionType.choices, default=QuestionType.TEXTAREA)
    question = GenericRelation("ApplicationQuestion", object_id_field='object_id', content_type_field='question_type')
    prompt = models.TextField()

    @property
    def first_prompt(self):
        return self.prompt.first()


class DropdownPrompt(models.Model):
    type = models.PositiveSmallIntegerField(choices=QuestionType.choices, default=QuestionType.DROPDOWN)
    question = GenericRelation("ApplicationQuestion", object_id_field='object_id', content_type_field='question_type')
    prompt = models.JSONField()

    @property
    def first_prompt(self):
        return self.prompt.first()


class RadioPrompt(models.Model):
    type = models.PositiveSmallIntegerField(choices=QuestionType.choices, default=QuestionType.RADIO)
    question = GenericRelation("ApplicationQuestion", object_id_field='object_id', content_type_field='question_type')
    prompt = models.JSONField()

    @property
    def first_prompt(self):
        return self.prompt.first()


class CheckboxPrompt(models.Model):
    type = models.PositiveSmallIntegerField(choices=QuestionType.choices, default=QuestionType.CHECKBOX)
    question = GenericRelation("ApplicationQuestion", object_id_field='object_id', content_type_field='question_type')
    prompt = models.JSONField()

    @property
    def first_prompt(self):
        return self.prompt.first()


class FilePrompt(models.Model):
    type = models.PositiveSmallIntegerField(choices=QuestionType.choices, default=QuestionType.FILE)
    question = GenericRelation("ApplicationQuestion", object_id_field='object_id', content_type_field='question_type')
    prompt = models.TextField()

    @property
    def first_prompt(self):
        return self.prompt.first()


class ApplicationQuestion(models.Model):
    title = models.TextField()
    application_form = models.ForeignKey("ApplicationForm", on_delete=models.CASCADE, related_name='questions')

    question_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    question_object = GenericForeignKey('question_type', 'object_id')

    class Meta:
        unique_together = ('question_type', 'object_id')
