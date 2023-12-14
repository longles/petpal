from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404

from ..models import Application, Pet, ApplicationForm
from ..serializers import ApplicationSerializer, ApplicationUpdateSerializer, ApplicationSerializerGet
from accounts.permission import IsPetSeeker, IsShelter
from ..utils import method_permission_classes


class ApplicationPagination(PageNumberPagination):
    page_size = 5


class ApplicationCreateListView(APIView, ApplicationPagination):
    permission_classes = [IsAuthenticated]


    @method_permission_classes([IsPetSeeker])
    def post(self, request):
        pet_id = request.data.get('pet')
        form_id = request.data.get('form')
        responses = request.data.get('responses')

        if not Pet.objects.filter(id=pet_id, status=Pet.Status.AVAILABLE).first():
            return Response({'detail': 'Pet not available for application.'}, status=status.HTTP_400_BAD_REQUEST)

        if not ApplicationForm.objects.filter(id=form_id).first():
            return Response({'detail': 'Application form not available for application.'}, status=status.HTTP_400_BAD_REQUEST)

        data = {'pet': pet_id, 'form': form_id, 'applicant': request.user.user_object.pk, 'responses': responses}
        serializer = ApplicationSerializer(data=data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response({'detail': "Could not seriaize the request"}, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request):
        current_user = request.user
        user_type =  request.user.user_type.model
        filter = {}

        if user_type == 'petseeker':
            filter['applicant'] = current_user.user_object
        elif user_type == 'petshelter':
            filter['pet__shelter'] = current_user.user_object
        else:
            return Response({'detail': "Unauthorized user type."}, status=status.HTTP_403_FORBIDDEN)

        applications = Application.objects.filter(**filter)

        # Filter by id
        id_filter = request.query_params.get('id')
        if id_filter != None:
            applications = applications.filter(id=id_filter)

        # Filter by status
        valid_status_filters = (
            Application.Status.PENDING,
            Application.Status.APPROVED,
            Application.Status.DENIED,
            Application.Status.WITHDRAWN,
        )

        status_filter = request.query_params.get('status')
        if status_filter != None and int(status_filter) not in valid_status_filters:
            return Response({'detail': "Invalid status filter"}, status=status.HTTP_400_BAD_REQUEST)
        if status_filter != None:
            applications = applications.filter(status=int(status_filter))

        # Sort by date
        date_sort = request.query_params.get('date_sort')
        if date_sort == 'last_updated_asc':
            applications = applications.order_by('last_updated')
        elif date_sort == 'last_updated_desc':
            applications = applications.order_by('-last_updated')
        elif date_sort == 'created_at_asc':
            applications = applications.order_by('created_at')
        elif date_sort == 'created_at_desc':
            applications = applications.order_by('-created_at')
        else:
            return Response({'detail': "Invalid sorting parameter"}, status=status.HTTP_400_BAD_REQUEST)

        # Filter by pet name
        pet_name = request.query_params.get('pet_name')
        if pet_name != None:
            applications = applications.filter(pet__name__icontains=pet_name)

        results = self.paginate_queryset(applications, request, view=self)
        serializer = ApplicationSerializer(results, many=True, context={'request': request})
        return self.get_paginated_response(serializer.data)


class ApplicationUpdateDetailView(APIView):
    permission_classes = [IsAuthenticated]


    def get(self, request, pk):
        current_user = request.user
        user_type = request.user.user_type.model

        filter = {'pk': pk}

        if user_type == 'petseeker':
            filter['applicant'] = current_user.user_object
        elif user_type == 'petshelter':
            filter['pet__shelter'] = current_user.user_object
        else:
            return Response({'detail': "Unauthorized user type."}, status=status.HTTP_403_FORBIDDEN)

        application = get_object_or_404(Application, **filter)
        serializer = ApplicationSerializerGet(application, context={'request': request})

        return Response(serializer.data)


    def patch(self, request, pk):
        current_user = request.user
        user_type = request.user.user_type.model

        if user_type == 'petseeker':
            application = get_object_or_404(Application, pk=pk, applicant=current_user.user_object)
            if application.status in [Application.Status.PENDING, Application.Status.APPROVED]:
                allowed_status_changes = [Application.Status.WITHDRAWN]
            else:
                return Response({'detail': "Pet seeker can only withdraw pending or approved applications."}, status=status.HTTP_403_FORBIDDEN)

        elif user_type == 'petshelter':
            application = get_object_or_404(Application, pk=pk, pet__shelter=current_user.user_object)
            if application.status == Application.Status.PENDING:
                allowed_status_changes = [Application.Status.APPROVED, Application.Status.DENIED]
            else:
                return Response({'detail': "Shelter can only update pending applications."}, status=status.HTTP_403_FORBIDDEN)

        else:
            return Response({'detail': "Unauthorized user type."}, status=status.HTTP_403_FORBIDDEN)

        # Update application status if allowed
        new_status = request.data.get('status')
        if new_status in allowed_status_changes:
            serializer = ApplicationUpdateSerializer(application, data={'status': new_status}, partial=True, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response({'detail': "Could not seriaize the request"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': "Invalid status update."}, status=status.HTTP_400_BAD_REQUEST)
