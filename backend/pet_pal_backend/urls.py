from pets.views import PetViewSet, backdoorData
from rest_framework.routers import DefaultRouter
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from accounts.views import ShelterCommentListCreate, ApplicationCommentListCreate
from accounts.serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views import CustomTokenObtainPairView

from django.conf import settings
from django.conf.urls.static import static



from accounts.views.notificationView import NotificationViewset

# admin paths
urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('pets/', include('pets.urls'))
]

# auth paths
# code from simplejwt docs https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html
urlpatterns += [
    path('accounts/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('accounts/login/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]

# comments paths
urlpatterns += [
    path('shelter/<int:pk>/comments/', ShelterCommentListCreate.as_view(), name="shelter_comment_list_create"),
    path('application/<int:pk>/comments/', ApplicationCommentListCreate.as_view(), name="application_comment_list_create")
]


router = DefaultRouter()
router.register('pets', PetViewSet, basename='pet')
router.register(r'notifications', NotificationViewset, basename='notification')

urlpatterns += router.urls

urlpatterns += static(settings.PHOTOS_URL, document_root=settings.PHOTOS_ROOT)
urlpatterns += static(settings.PROFILE_PIC_URL, document_root=settings.PROFILE_PIC_ROOT)
