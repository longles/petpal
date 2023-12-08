# DO NOT RUN THIS FILE!

from django.test import TestCase, Client
from django.urls import reverse
from pets.models import *
from accounts.models import User, PetShelter, PetSeeker, Application
from datetime import datetime
from unittest import skip


@skip("Skip the set-up tests")
class UserSetup1Test(TestCase):
    """
    This test class will generate 1 pet seeker and 1 pet shelter.
    """

    def setUp(self) -> None:
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

        # Pet Seeker
        self.seeker = User.objects.create_user(
            username='seeker1',
            password='seeker_password1',
            phone_num="1234567890",
            user_object=PetSeeker.objects.create(bio="I love pets!")
        )


@skip("Skip the set-up tests")
class UserSetup2Test(UserSetup1Test):
    """
    This test class will generate 1 pet seeker and 2 pet shelters.
    """

    def setUp(self) -> None:
        super().setUp()

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


@skip("Skip the set-up tests")
class UserSetup3Test(UserSetup2Test):
    """
    This test class will generate 2 pet seekers and 2 pet shelters.
    """

    def setUp(self) -> None:
        super().setUp()

        self.seeker2 = User.objects.create_user(
            username='seeker2',
            password='seeker_password2',
            phone_num="1234567890",
            user_object=PetSeeker.objects.create(bio="I love cats!")
        )
