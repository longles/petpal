from rest_framework import serializers
from .applicationFormSerializer import ApplicationQuestionSerializer
from ..models import Application, QuestionResponse, TextareaResponse, DropdownResponse, RadioResponse, CheckboxResponse, FileResponse
from ..models import QuestionType


class TextareaResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextareaResponse
        fields = ('id', 'type', 'response')


class DropdownResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = DropdownResponse
        fields = ('id', 'type', 'response')


class RadioResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = RadioResponse
        fields = ('id', 'type', 'response')


class CheckboxResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckboxResponse
        fields = ('id', 'type', 'response')


class FileResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileResponse
        fields = ('id', 'type', 'response')


class ResponseObjectRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, TextareaResponse):
            serializer = TextareaResponseSerializer(value)
        elif isinstance(value, DropdownResponse):
            serializer = DropdownResponseSerializer(value)
        elif isinstance(value, RadioResponse):
            serializer = RadioResponseSerializer(value)
        elif isinstance(value, CheckboxResponse):
            serializer = CheckboxResponseSerializer(value)
        elif isinstance(value, FileResponse):
            serializer = FileResponseSerializer(value)
        else:
            raise Exception('Unexpected type of response object')
        return serializer.data


    def to_internal_value(self, data):
        response_type = data.get('type')

        if response_type == QuestionType.TEXTAREA:
            serializer = TextareaResponseSerializer(data=data)
        elif response_type == QuestionType.DROPDOWN:
            serializer = DropdownResponseSerializer(data=data)
        elif response_type == QuestionType.RADIO:
            serializer = RadioResponseSerializer(data=data)
        elif response_type == QuestionType.CHECKBOX:
            serializer = CheckboxResponseSerializer(data=data)
        elif response_type == QuestionType.FILE:
            serializer = FileResponseSerializer(data=data)
        else:
            raise serializers.ValidationError('Invalid response type')

        if serializer.is_valid():
            return serializer.save()
        else:
            raise serializers.ValidationError(serializer.errors)



class QuestionResponseSerializer(serializers.ModelSerializer):
    response_object = ResponseObjectRelatedField(queryset=QuestionResponse.objects.all())

    class Meta:
        model = QuestionResponse
        fields = ('id', 'question', 'response_object')


class ApplicationSerializer(serializers.ModelSerializer):
    responses = QuestionResponseSerializer(many=True)

    class Meta:
        model = Application
        fields = ('id', 'pet', 'applicant', 'form', 'status', 'responses', 'created_at', 'last_updated')


    def create(self, validated_data):
        response_data = validated_data.pop('responses')
        application = Application.objects.create(**validated_data)

        for response in response_data:
            QuestionResponse.objects.create(application=application, **response)

        return application


class ApplicationUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ('status',)