
import json
from django.test import TestCase
from pets.models import *
from accounts.models import *
from datetime import datetime
from ..serializers import ApplicationSerializer, ApplicationFormSerializer




class ApplicationTestCase(TestCase):
    def setUp(self):
        # Pet Seeker
        seeker = User.objects.create_user(
            username='seeker1',
            password='seeker_password1',
            phone_num="1234567890",
            user_object=PetSeeker.objects.create(bio="I love pets!")
        )

        # Pet Shelter
        shelter = User.objects.create_user(
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

        # Pet
        pet = Pet.objects.create(
            name="Sparky",
            birth_date=datetime.now().date(),
            medical_history="Healthy",
            behaviour="Friendly",
            shelter=shelter.user_object
        )

        # Application Form
        app_form = ApplicationForm.objects.create(
            shelter=shelter.user_object
        )

        question = ApplicationQuestion.objects.create(
            application_form=app_form,
            title="Gauge Interest in Pet",
            question_object=TextareaPrompt.objects.create(
                prompt="Why do you want to adopt this pet?"
            )
        )

        # Seeker Application
        app = Application.objects.create(
            pet=pet,
            applicant=seeker.user_object
        )

        QuestionResponse.objects.create(
            question=question,
            application=app,
            response_object=TextareaResponse.objects.create(response="Because I love pets!")
        )


    def test_serialize_app(self):
        app = Application.objects.first()
        print(json.dumps(ApplicationSerializer(app).data))


    def test_serialize_app_form(self):
        app_form = ApplicationForm.objects.first()
        print(json.dumps(ApplicationFormSerializer(app_form).data))
