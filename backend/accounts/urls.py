from django.urls import path, include
from .views import PetShelterViewSet, PetSeekerUpdateGetDelete, AccountCreateView, AccountUpdateView
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'shelters', PetShelterViewSet, basename="shelter")

app_name = 'accounts'
urlpatterns = [
    # seeker sign-up
    path('', AccountCreateView.as_view(), name='user-create'),
    path('<int:pk>/', AccountUpdateView.as_view(), name='user-update'),
    # read/update/delete seeker profile
    path('seekers/<int:pk>/', PetSeekerUpdateGetDelete.as_view(), name='seeker-profile'),
    # shelter sign-up
    # path('', PetSeekerViewSet.as_view({'post': 'create'}), name='seeker-create'),
]
urlpatterns += router.urls
