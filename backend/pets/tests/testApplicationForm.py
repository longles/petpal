from django.test import TestCase
from pets.models import *
from accounts.models import *
from datetime import datetime


class ApplicationFormTestCase(TestCase):
    def setUp(self):
        # Pet Shelter
        shelter = User.objects.create_user(
            username='shelter1',
            password='shelter_password1',
            phone_num="0987654321",
            user_object=PetShelter.objects.create(
                shelter_name="Doggycares",
                mission="We love dogs!",
                about_us="We are a shelter that cares for dogs.",
                location="1234 Doggy Lane"
            )
        )

        # Pet Shelter
        Pet.objects.create(
            name="Sparky",
            birth_date=datetime.now().date(),
            medical_history="Healthy",
            behaviour="Friendly",
            shelter=shelter.user_object
        )

        # Application Questions
        app_form = ApplicationForm.objects.create(
            shelter=shelter.user_object
        )

        ApplicationQuestion.objects.create(
            application_form=app_form,
            title="Gauge Interest in Pet",
            question_object=TextareaPrompt.objects.create(
                prompt="Why do you want to adopt this pet?"
            )
        )

        ApplicationQuestion.objects.create(
            application_form=app_form,
            title="Willingness to Travel to Shelter",
            question_object=RadioPrompt.objects.create(
                prompt=["Yes", "No"]
            )
        )


    def test_query_length(self):
        app_form = ApplicationForm.objects.first()
        questions = ApplicationQuestion.objects.filter(application_form=app_form).all()

        self.assertEqual(len(questions), 2)


    def test_title_match(self):
        app_form = ApplicationForm.objects.first()
        questions = ApplicationQuestion.objects.filter(application_form=app_form).all()
        textarea_question = questions.filter(title="Gauge Interest in Pet").first()

        self.assertEqual(textarea_question.question_object.prompt, "Why do you want to adopt this pet?")