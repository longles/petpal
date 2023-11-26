from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404

from ..models import ApplicationForm
from ..serializers import ApplicationFormSerializer
from accounts.permission import IsShelter


class ApplicationFormCreateListView(APIView, PageNumberPagination):
    permission_classes = [IsAuthenticated, IsShelter]

    def post(self, request):
        data = {'shelter': request.user.user_object.pk, 'questions': request.data.get('questions')}
        serializer = ApplicationFormSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request):
        application_forms = ApplicationForm.objects.filter(shelter=request.user.user_object)
        results = self.paginate_queryset(application_forms, request)
        serializer = ApplicationFormSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)


class ApplicationFormDeleteDetailView(APIView):
    permission_classes = [IsAuthenticated, IsShelter]


    def delete(self, request, pk):
        application_form = get_object_or_404(ApplicationForm, pk=pk, shelter=request.user.user_object)
        application_form.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    def get(self, request, pk):
        application_form = get_object_or_404(ApplicationForm, pk=pk, shelter=request.user.user_object)
        serializer = ApplicationFormSerializer(application_form)
        return Response(serializer.data)
