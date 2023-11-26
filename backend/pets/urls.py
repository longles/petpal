from django.urls import path
from .views import ApplicationCreateListView, ApplicationUpdateDetailView
from .views import ApplicationFormCreateListView, ApplicationFormDeleteDetailView


urlpatterns = [
    path('applications/', ApplicationCreateListView.as_view(), name='application-create-list'),
    path('applications/<int:pk>/', ApplicationUpdateDetailView.as_view(), name='application-update-detail'),
]

urlpatterns += [
    path('applications/form/', ApplicationFormCreateListView.as_view(), name='application-create-list'),
    path('applications/form/<int:pk>/', ApplicationFormDeleteDetailView.as_view(), name='application-form-delete-detail'),
]