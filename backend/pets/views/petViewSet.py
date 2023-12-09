from django.shortcuts import redirect
from django.urls import reverse
from rest_framework import viewsets
from rest_framework.exceptions import NotFound
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from accounts.models import User, PetShelter, PetSeeker
from ..models import Pet, ApplicationForm, ApplicationQuestion, TextareaPrompt
from ..serializers import PetSerializer


from datetime import datetime

class PetViewSet(viewsets.ModelViewSet):
    serializer_class = PetSerializer
    search_fields = ['shelter', 'status', 'breed', 'size', 'colour', 'sex', 'species']  # filter fields
    ordering_fields = ['name', 'size', 'birth_date','weight']  # sorting fields
    filter_backends = [OrderingFilter, SearchFilter]
    ordering = ['-birth_date']

    def get_list_queryset(self):
        # or we can use django_filter_backend
        # default filter
        queryset = Pet.objects.all() #.filter(status=Pet.Status.AVAILABLE)
        status = self.request.query_params.get('status', 2)
        shelter = self.request.query_params.get('shelter')
        breed = self.request.query_params.get('breed')
        species = self.request.query_params.get('species')
        size = self.request.query_params.get('size')
        colour = self.request.query_params.get('colour')
        sex = self.request.query_params.get('sex')

        if status:
            queryset = queryset.filter(status=status)
        if shelter:
            queryset = queryset.filter(shelter=shelter)
        if breed:
            queryset = queryset.filter(breed=breed)
        if species:
            queryset = queryset.filter(species=species)
        if size:
            queryset = queryset.filter(size=size)
        if colour:
            queryset = queryset.filter(colour=colour)
        if sex:
            queryset = queryset.filter(sex=sex)

        return queryset
    def get_queryset(self):
        if self.action == 'list':
            return self.get_list_queryset()
        elif self.action == 'retrieve':
            return Pet.objects.all()
        else:
            print(self.request.POST.values())
            authenticator = JWTAuthentication()
            res = authenticator.authenticate(self.request)
            if res is None:
                self.permission_denied(self.request, message="You must be logged in as a shelter to do this.")
            user, token = res
            if user.user_type.model != "petshelter":
                raise NotFound()
            return Pet.objects.filter(shelter_id=user.user_object.pk)  # later when adding permissions should change to only shelter-owned pets

    def perform_create(self, serializer):
        authenticator = JWTAuthentication()
        res = authenticator.authenticate(self.request)
        if res is None:
            self.permission_denied(self.request, message="You must be logged in as a shelter to do this.")
        user, token = res
        if user.user_type.model != "petshelter":
            self.permission_denied(self.request, message="You must be logged in as a shelter to do this.")
        serializer.save(shelter_id=user.user_object.pk)

def backdoorData(request):
    # Pet Seeker
    seeker1 = User.objects.create_user(
        username='seeker1',
        password='seeker_password1',
        phone_num="1234567890",
        user_object=PetSeeker.objects.create(
            bio="I love pets!"
        )
    )
    seeker1.save()

    seeker2 = User.objects.create_user(
        username='seeker2',
        password='seeker_password2',
        phone_num="1112223334",
        user_object=PetSeeker.objects.create(
            bio="I love pets!"
        )
    )
    seeker2.save()

    # Pet Shelter
    shelter1 = User.objects.create_user(
        username='shelter1',
        password='shelter_password1',
        phone_num="0987654321",
        user_object=PetShelter.objects.create(
            name="Doggycares",
            mission="We love dogs!",
            about_us="We are a shelter that cares for dogs.",
            location="1234 Doggy Lane"
        )
    )
    shelter1.save()

    shelter2 = User.objects.create_user(
        username='shelter2',
        password='shelter_password2',
        phone_num="1231231231",
        user_object=PetShelter.objects.create(
            name="Kittycares",
            mission="We love cats!",
            about_us="We are a shelter that cares for cats.",
            location="1234 Kitty Lane"
        )
    )
    shelter2.save()

    # Pet
    pet1 = Pet.objects.create(
        name="Sparky",
        birth_date=datetime.now().date(),
        medical_history="Healthy",
        behaviour="Friendly",
        shelter=shelter1.user_object
    )
    pet1.save()

    # Pet
    pet2 = Pet.objects.create(
        name="Angel",
        birth_date=datetime.now().date(),
        medical_history="Healthy",
        behaviour="Friendly",
        shelter=shelter2.user_object
    )
    pet2.save()

    # Application Form
    app_form1 = ApplicationForm.objects.create(
        shelter=shelter1.user_object
    )
    app_form1.save()

    question1 = ApplicationQuestion.objects.create(
        application_form=app_form1,
        title="Gauge Interest in Pet",
        question_object=TextareaPrompt.objects.create(
            prompt="Why do you want to adopt this pet?"
        )
    )
    question1.save()

    app_form2 = ApplicationForm.objects.create(
        shelter=shelter1.user_object
    )
    app_form2.save()

    question2 = ApplicationQuestion.objects.create(
        application_form=app_form2,
        title="Check Financial Stability",
        question_object=TextareaPrompt.objects.create(
            prompt="How much do you make per year?"
        )
    )
    question2.save()

    return redirect(reverse('api-root'))
