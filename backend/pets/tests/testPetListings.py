from django.test import TestCase, Client
from django.urls import reverse
from pets.models import Pet
from datetime import datetime
from accounts.models import *
import json


class PetListViewTest(TestCase):
    def setUp(self):

        # shelter code copy from testApplication
        test_shelter = User.objects.create_user(
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
        # I will come back to this later
        Pet.objects.create(
            name="Buddy1",
            birth_date=datetime.now().date(),
            sex=Pet.Sex.MALE,
            species=Pet.Species.DOG,
            breed=Pet.Breed.LABRADOR,
            size=Pet.Size.MEDIUM,
            colour=Pet.Colour.BLACK,
            status=Pet.Status.AVAILABLE,
            medical_history="active",
            behaviour="Friendly",
            shelter=test_shelter.user_object
        )

        Pet.objects.create(
            name="Buddy2",
            birth_date=datetime.now().date(),
            sex=Pet.Sex.FEMALE,
            species=Pet.Species.CAT,
            breed=Pet.Breed.LABRADOR,
            size=Pet.Size.SMALL,
            colour=Pet.Colour.BLACK,
            status=Pet.Status.AVAILABLE,
            medical_history="Healthy",
            behaviour="playful",
            shelter=test_shelter.user_object
        )
        Pet.objects.create(
            name="Bob_adopted",
            birth_date=datetime.now().date(),
            sex=Pet.Sex.FEMALE,
            species=Pet.Species.CAT,
            breed=Pet.Breed.LABRADOR,
            size=Pet.Size.SMALL,
            colour=Pet.Colour.BLACK,
            status=Pet.Status.ADOPTED,
            medical_history="Healthy",
            behaviour="playful",
            shelter=test_shelter.user_object
        )
        self.client = Client()

    def run(self, result=None):
        print("\nRunning:", self._testMethodName)
        super().run(result)

    def test_get_all_pets(self):
        print('test')
        url = reverse('pet_listing')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        pets = Pet.objects.all()
        self.assertTrue(pets.exists())
        # check content
        response_data = json.loads(response.content)
        self.assertEqual(len(response_data['results']), Pet.objects.count())


    def test_get_pets_filter_available(self):
        url = reverse('pet_listing') + f'?status={Pet.Status.AVAILABLE}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        for pet in response_data['results']:
            self.assertEqual(pet['status'], Pet.Status.AVAILABLE)

    def test_get_pets_filter_species_cat(self):
        url = reverse('pet_listing') + f'?species={Pet.Species.CAT}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        for pet in response_data['results']:
            self.assertEqual(pet['species'], Pet.Species.CAT)

    def test_get_pets_filter_species_dog(self):
        url = reverse('pet_listing') + f'?species={Pet.Species.DOG}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        for pet in response_data['results']:
            self.assertEqual(pet['species'], Pet.Species.DOG) 