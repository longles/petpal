from rest_framework import serializers
from ..models import Pet

class PetSerializer(serializers.ModelSerializer):
    shelter = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Pet
        fields = '__all__'