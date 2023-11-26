from rest_framework import status

from .generalTestCaseSetUp import *
from rest_framework.test import APITestCase
from unittest import skip


class PetSeekerCreationDeletionTest(APITestCase):
    """
    This test set assesses the creation and deletion of pet seeker accounts.

    The following behavior should be expected:
    - a pet seeker is successfully created
    - a pet seeker is successfully deleted:
      - all notifications associated with the user are deleted
      - all applications associated with the user are deleted
    """

    def setUp(self) -> None:
        self.username = 'seeker1'
        self.password = 'seeker_password1'
        self.email = 'seeker1@test.com'
        self.phone_num = "1234567890"

    def tearDown(self) -> None:
        user = User.objects.get(username=self.username)
        if user:
            user.delete()

    def test_pet_seeker_signup(self):
        # Create User
        response = self.client.post(reverse('accounts:seeker-create'),
                                    {
                                        'username': self.username,
                                        'password': self.password,
                                        'email': self.email,
                                        'phone_num': self.phone_num,
                                        'bio': 'asdfj'
                                    })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        user = User.objects.get(username=self.username)
        self.assertTrue(user is not None, 'user does not exist')
        self.assertTrue(user.pk is not None, 'user does not exist')


class PetShelterCreationDeletionTest(TestCase):
    """
    This test set assesses the creation and deletion of pet seeker accounts.

    The following behavior should be expected:
    - a pet seeker is successfully created
    - a pet seeker is successfully deleted:
      - all notifications associated with the user are deleted
      - all applications associated with the user are deleted
    """
    pass


class UserInfoUpdateTest(TestCase):
    # self.pet_seeker_data['user'] = user.id
    # response = self.client.post(reverse('petseeker-signup'), self.pet_seeker_data)
    # self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    #
    # # Test PetSeeker Profile
    # pet_seeker = PetSeeker.objects.get(user=user)
    # self.assertEqual(pet_seeker.bio, self.pet_seeker_data['bio'])
    pass


@skip("skip permission test for now")
class UserPermissionTest(TestCase):
    """
    This test set assesses the following scenarios related to permission checking:

    - Get
        - Any user (shelter or seeker) can see the profile of a shelter.
        - Shelters can only view pet seekers' profiles if they have an active application with the shelter.
    - List
        - Can view a list of shelters
        - Cannot view a list of pet seekers
    """

    def setUp(self) -> None:
        # Pet Shelter
        self.shelter = User.objects.create_user(
            username='shelter1',
            password='shelter_password1',
            phone_num="0987654321",
            user_object=PetShelter.objects.create(
                shelter_name="shelter1",
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
                shelter_name="shelter2",
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
            applicant=self.seeker.user_object,
            status=Application.Status.PENDING
        )

        QuestionResponse.objects.create(
            question=question,
            application=self.application,
            response_object=TextareaResponse.objects.create(response="Because I love pets!")
        )

        self.client = Client()
        self.comment_url = reverse('application_comment_list_create', kwargs={'pk': self.application.id})

    def tearDown(self) -> None:
        pass

    def run(self, result=None):
        print("\nRunning:", self._testMethodName)
        super().run(result)

    def test_get_shelter_profile(self):
        """
        Expected: Any user (shelter or seeker) can see the profile of a shelter.
        """
        pass

    def test_get_seeker_profile_basic(self):
        """
        Expected: Pet seekers should be able to view their own profiles.
        """
        pass

    def test_get_seeker_profile_by_shelter(self):
        """
        Expected: Shelters can only view pet seekers' profiles if they have an active application with the shelter.
        """
        pass

    def test_get_list_of_shelters(self):
        """
        Expected: Anyone can view a list of pet shelters.
        """
        pass

    def test_no_access_to_list_of_seekers(self):
        """
        Expected: No one should see a list of pet seekers.
        """
        pass
