from rest_framework import serializers
from ..models import ApplicationForm, ApplicationQuestion, TextareaPrompt, DropdownPrompt, RadioPrompt, CheckboxPrompt, FilePrompt
from ..models import QuestionType

# https://www.sankalpjonna.com/learn-django/representing-foreign-key-values-in-django-serializers
# https://stackoverflow.com/questions/38721923/serializing-a-generic-relation-in-django-rest-framework


class TextareaPromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextareaPrompt
        fields = ('id', 'type', 'prompt')


class DropdownPromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = DropdownPrompt
        fields = ('id', 'type', 'prompt')


class RadioPromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = RadioPrompt
        fields = ('id', 'type', 'prompt')


class CheckboxPromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckboxPrompt
        fields = ('id', 'type', 'prompt')


class FilePromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilePrompt
        fields = ('id', 'type', 'prompt')


class PromptObjectRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, TextareaPrompt):
            serializer = TextareaPromptSerializer(value)
        elif isinstance(value, DropdownPrompt):
            serializer = DropdownPromptSerializer(value)
        elif isinstance(value, RadioPrompt):
            serializer = RadioPromptSerializer(value)
        elif isinstance(value, CheckboxPrompt):
            serializer = CheckboxPromptSerializer(value)
        elif isinstance(value, FilePrompt):
            serializer = FilePromptSerializer(value)
        else:
            raise Exception('Unexpected type of prompt object')
        return serializer.data


    def to_internal_value(self, data):
        prompt_type = data.get('type')

        if prompt_type == QuestionType.TEXTAREA:
            serializer = TextareaPromptSerializer(data=data)
        elif prompt_type == QuestionType.DROPDOWN:
            serializer = DropdownPromptSerializer(data=data)
        elif prompt_type == QuestionType.RADIO:
            serializer = RadioPromptSerializer(data=data)
        elif prompt_type == QuestionType.CHECKBOX:
            serializer = CheckboxPromptSerializer(data=data)
        elif prompt_type == QuestionType.FILE:
            serializer = FilePromptSerializer(data=data)
        else:
            raise serializers.ValidationError('Unexpected prompt type')

        if serializer.is_valid():
            return serializer.save()
        else:
            raise serializers.ValidationError(serializer.errors)


class ApplicationQuestionSerializer(serializers.ModelSerializer):
    question_object = PromptObjectRelatedField(queryset=ApplicationQuestion.objects.all())

    class Meta:
        model = ApplicationQuestion
        fields = ('id', 'title', 'question_object')


class ApplicationFormSerializer(serializers.ModelSerializer):
    questions = ApplicationQuestionSerializer(many=True)

    class Meta:
        model = ApplicationForm
        fields = ('id', 'shelter', 'questions', 'created_at')


    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        application_form = ApplicationForm.objects.create(**validated_data)

        for question_data in questions_data:
            ApplicationQuestion.objects.create(application_form=application_form, **question_data)

        return application_form
