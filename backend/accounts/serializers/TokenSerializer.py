from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({'user_id': str(self.user.id)})
        data.update({'user_type': self.user.user_type.model})
        data.update({'user_object_id': str(self.user.user_id)})
        return data