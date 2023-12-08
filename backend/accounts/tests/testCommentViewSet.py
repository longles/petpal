from django.test import TestCase, Client
from django.urls import reverse
from pets.models import *
from accounts.models import User, PetShelter, PetSeeker, Application, Comment
import json
from datetime import datetime
from django.contrib.contenttypes.models import ContentType

class CommentCreationTest(TestCase):
    def setUp(self):
        # Pet Shelter
        self.shelter = User.objects.create_user(
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

        self.shelter2 = User.objects.create_user(
            username='shelter2',
            password='shelter_password2',
            phone_num="0887654321",
            user_object=PetShelter.objects.create(
                name="Kittycares",
                mission="We love cats!",
                about_us="We are a shelter that cares for cats.",
                location="4321 Kitty Lane"
            )
        )

        # Pet Seeker
        self.seeker = User.objects.create_user(
            username='seeker1',
            password='seeker_password1',
            phone_num="1234567890",
            user_object=PetSeeker.objects.create(bio="I love pets!")
        )


        # Pet
        self.pet = Pet.objects.create(
            name="Sparky",
            birth_date=datetime.now().date(),
            medical_history="Healthy",
            behaviour="Friendly",
            shelter=self.shelter.user_object
        )

        # Application Form
        self.app_form = ApplicationForm.objects.create(
            shelter=self.shelter.user_object
        )

        question = ApplicationQuestion.objects.create(
            application_form=self.app_form,
            type=ApplicationQuestion.QuestionType.TEXTAREA,
            title="Gauge Interest in Pet",
            question_object=TextareaPrompt.objects.create(prompt="Why do you want to adopt this pet?")
        )

        # Seeker Application
        self.application = Application.objects.create(
            pet=self.pet,
            applicant=self.seeker.user_object
        )

        QuestionResponse.objects.create(
            question=question,
            application=self.application,
            response_object=TextareaResponse.objects.create(response="Because I love pets!")
        )

        self.client = Client()
        self.comment_url = reverse('application_comment_list_create',kwargs={'pk': self.application.id}) 

    def run(self, result=None):
        print("\nRunning:", self._testMethodName)
        super().run(result) 

    def test_seeker_comment_application(self):
        self.client.login(username='seeker1', password='seeker_password1')
        application = Application.objects.get(applicant=self.seeker.user_object, pet=self.pet)
        test_comment = 'This is a test comment from seeker'
        comment = Comment.objects.create(
            receiver_type=ContentType.objects.get_for_model(application),
            receiver_id=application.id,
            sender=self.seeker,
            content=test_comment
        )

        # confirm that the comment is in database and has the right content

        comment_in_db = Comment.objects.get(
        receiver_type=ContentType.objects.get_for_model(application),
        receiver_id=application.id,
        sender=self.seeker,
        content=test_comment
    )

        self.assertEqual(comment_in_db.sender, self.seeker)
        self.assertEqual(comment_in_db.receiver_id, application.id)
        self.assertEqual(comment_in_db.content, test_comment)

    def test_shelter_comment_application(self):
        self.client.login(username='shelter1', password='shelter_password1')
        application = Application.objects.get(applicant=self.seeker.user_object, pet=self.pet)
        test_comment = 'This is a test comment from shelter'
        comment = Comment.objects.create(
        receiver_type=ContentType.objects.get_for_model(application),
        receiver_id=application.id,
        sender=self.shelter,
        content=test_comment
        )

        comment_in_db = Comment.objects.get(
        receiver_type=ContentType.objects.get_for_model(application),
        receiver_id=application.id,
        sender=self.shelter,
        content=test_comment
    )

        self.assertEqual(comment_in_db.sender, self.shelter)
        self.assertEqual(comment_in_db.receiver_id, application.id)
        self.assertEqual(comment_in_db.content, test_comment)


    def test_seeker_comment_shelter(self):
        self.client.login(username='seeker1', password='seeker_password1')
        shelter = self.shelter
        test_comment = 'This is a test comment from seeker'
        comment = Comment.objects.create(
            receiver_type=ContentType.objects.get_for_model(shelter),
            receiver_id=shelter.id,
            sender=self.seeker,
            content=test_comment
        )

        comment_in_db = Comment.objects.get(
            receiver_type=ContentType.objects.get_for_model(shelter),
            receiver_id=shelter.id,
            sender=self.seeker,
            content=test_comment
            )
        
        self.assertEqual(comment_in_db.sender, self.seeker)
        self.assertEqual(comment_in_db.receiver_id, shelter.id)
        self.assertEqual(comment_in_db.content, test_comment)

    def test_shelter_comment_shelter(self):
        self.client.login(username='shelter1', password='shelter1')
        shelter1 = self.shelter
        shelter2 = self.shelter2
        test_comment = 'This is a test comment from shelter1'
        comment = Comment.objects.create(
            receiver_type=ContentType.objects.get_for_model(shelter2),
            receiver_id=shelter2.id,
            sender=shelter1,
            content=test_comment
        )

        comment_in_db = Comment.objects.get(
            receiver_type=ContentType.objects.get_for_model(shelter2),
            receiver_id=shelter2.id,
            sender=shelter1,
            content=test_comment
            )
        
        self.assertEqual(comment_in_db.sender, shelter1)
        self.assertEqual(comment_in_db.receiver_id, shelter2.id)
        self.assertEqual(comment_in_db.content, test_comment)

    def test_seeker_comment_application_without_login(self):
        self.client.logout()

        application = Application.objects.get(applicant=self.seeker.user_object, pet=self.pet)
        test_comment = 'This is a test comment from seeker'

        before_comment_count = Comment.objects.count()

        response = self.client.post(self.comment_url, {
            'receiver_type': ContentType.objects.get_for_model(application).id,
            'receiver_id': application.id,
            'sender': self.seeker.id,
            'content': test_comment
        })
        self.assertEqual(response.status_code, 401)
        after_comment_count = Comment.objects.count()

        self.assertEqual(before_comment_count, after_comment_count)

    def test_shelter_comment_application_without_login(self):
        self.client.logout()

        application = Application.objects.get(applicant=self.seeker.user_object, pet=self.pet)
        test_comment = 'This is a test comment from shelter'

        before_comment_count = Comment.objects.count()

        response = self.client.post(self.comment_url, {
            'receiver_type': ContentType.objects.get_for_model(application).id,
            'receiver_id': application.id,
            'sender': self.shelter.id,
            'content': test_comment
        })
        self.assertEqual(response.status_code, 401)
        after_comment_count = Comment.objects.count()

        self.assertEqual(before_comment_count, after_comment_count)