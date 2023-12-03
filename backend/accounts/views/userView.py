from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from ..models import User, PetShelter, PetSeeker
from ..serializers import PetShelterSerializer, PetSeekerSerializer, UserSerializer
from pets.models import Application, Pet
from rest_framework.exceptions import PermissionDenied, MethodNotAllowed
from rest_framework import generics
from rest_framework.decorators import action
from ..permission import IsShelterSelf
from ..serializers import CustomTokenObtainPairSerializer




class AccountCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    

class PetShelterViewSet(viewsets.ModelViewSet):
    queryset = PetShelter.objects.all()
    serializer_class = PetShelterSerializer
    http_method_names = ['head', 'get', 'put', 'patch', 'delete']
    # anyone (even not logged in) can view a list of shelters

    permission_classes_by_action = {'list': [AllowAny],
                                    'retrieve': [AllowAny],
                                    'partial_update': [IsAuthenticated, IsShelterSelf],
                                    'update': [IsAuthenticated, IsShelterSelf],
                                    'destroy': [IsAuthenticated, IsShelterSelf]}

    # Get permission for each action
    def get_permissions(self):
        self.permission_classes = self.permission_classes_by_action[self.action]
        return super().get_permissions()

    # def list(self, request, *args, **kwargs):
    #     serializer = PetShelterSerializer(self.queryset, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    # def update(self, request, *args, **kwargs):
    #     user = request.user
    #     instance = self.get_object()

    #     if instance.pk != user.user_id:
    #         return Response({'detail': "This is not your account!"}, status=status.HTTP_403_FORBIDDEN)

    #     return super().update(request, *args, **kwargs)

    # def destroy(self, request, *args, **kwargs):
    #     user = request.user
    #     instance = self.get_object()

    #     if instance.pk != user.user_id:
    #         return Response({'detail': "This is not your account!"}, status=status.HTTP_403_FORBIDDEN)

    #     return super().destroy(request, *args, **kwargs)


class PetSeekerUpdateGetDelete(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PetSeekerSerializer

    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        if self.request.user.user_type.model == "petseeker":
            return PetSeeker.objects.filter(pk=self.request.user.user_id)
        elif self.request.method == "GET" and self.request.user.user_type.model == "petshelter":
            shelter_id = self.request.user.user_object.pk
            return PetSeeker.objects.filter(applications__pet__shelter_id=shelter_id)

    # def update(self, request, *args, **kwargs):
    #     user = request.user
    #     instance = self.get_object()

    #     if instance.pk != user.user_id:
    #         return Response({'detail': "This is not your account!"}, status=status.HTTP_403_FORBIDDEN)

    #     return super().update(request, *args, **kwargs)

    # def destroy(self, request, *args, **kwargs):
    #     user = request.user
    #     instance = self.get_object()

    #     if instance.pk != user.user_id:
    #         return Response({'detail': "This is not your account!"}, status=status.HTTP_403_FORBIDDEN)

    #     return super().destroy(request, *args, **kwargs)

# class PetSeekerCreateView(generics.CreateAPIView):
#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#
#         # Extract user data from the request
#         user_data = {
#             'username': serializer.validated_data['username'],
#             'email': serializer.validated_data['email'],
#             'password': serializer.validated_data['password']
#         }
#
#         # Create a new User instance
#         user = User.objects.create_user(**user_data)
#
#         # Create the PetSeeker instance linked to the User
#         pet_seeker = PetSeeker.objects.create(
#             user=user,
#         )
#
#         # save the data
#         self.perform_create(serializer)
#
#         # Return a response
#         headers = self.get_success_headers(serializer.data)
#         return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
#
#
# class PetSeekerRUDView(generics.RetrieveUpdateDestroyAPIView):
#     permission_classes = [IsAuthenticated, IsPetSeeker]
#
#     def retrieve(self, request, *args, **kwargs):
#         pass
#
#     def perform_update(self, serializer):
#         pass
#
#     def perform_destroy(self, instance):
#         pass
#
#
# class PetShelterCreateView(generics.CreateAPIView):
#
#     def perform_create(self, serializer):
#         pass
#
#
# class PetShelterRUDView(generics.RetrieveUpdateDestroyAPIView):
#
#     def retrieve(self, request, *args, **kwargs):
#         pass
#
#     def perform_update(self, serializer):
#         pass
#
#     def perform_destroy(self, instance):
#         pass


# class PetShelterListView(generics.ListAPIView):
#     queryset = PetSeeker.objects.all()
#
#     def get(self, request, *args, **kwargs):
#         serializer = PetShelterSerializer(self.queryset, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
