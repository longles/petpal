from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.relations import PrimaryKeyRelatedField

from ..models import User, PetSeeker, PetShelter


class UserObjectRelatedField(serializers.Field):
    def to_representation(self, value):
        if isinstance(value, PetSeeker):
            usertype = 'petseeker'
            serializer = PetSeekerSerializer(value)
        elif isinstance(value, PetShelter):
            usertype = 'petshelter'
            serializer = PetShelterSerializer(value)
        else:
            raise ValidationError('Unexpected type of user object')
        return {'type': usertype, 'user': serializer.data}

    def to_internal_value(self, data):

        if data['type'] == 'petseeker':
            serializer = PetSeekerSerializer(data=data['user'])
        elif data['type'] == 'petshelter':
            serializer = PetShelterSerializer(data=data['user'])
        else:
            raise ValidationError('Unexpected type of user object')

        if serializer.is_valid():
            obj = serializer.save()
        else:
            raise ValidationError(serializer.errors)
        return obj

class UserSerializer(serializers.ModelSerializer):
    user_object = UserObjectRelatedField()
    class Meta:
        model = User
        fields = ('id', 'user_type', 'user_id', 'user_object', 'email', 'password', 'username')
        read_only_fields = ('id', 'user_type', 'user_id')

    # from https://stackoverflow.com/questions/43031323/how-to-create-a-new-user-with-django-rest-framework-and-custom-user-model
    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class PetSeekerSerializer(serializers.ModelSerializer):
    account_id = PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = PetSeeker
        fields = ('id', 'bio', 'phone_num', 'profile_pic', 'name', 'account_id')
        read_only_fields = ('id', )


class PetShelterSerializer(serializers.ModelSerializer):
    account_id = PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = PetShelter
        fields = ('id', 'shelter_name', 'mission', 'about_us', 'location', 'phone_num', 'profile_pic', 'contact_email', 'account_id')
        read_only_fields = ('id', )
