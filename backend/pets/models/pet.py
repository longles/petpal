from django.db import models

class Pet(models.Model):
    class Status(models.IntegerChoices):
        ADOPTED = 1, 'ADOPTED'
        AVAILABLE = 2, 'AVAILABLE'


    class Sex(models.IntegerChoices):
        UNKNOWN = 0, 'UNKNOWN'
        MALE = 1,'MALE'
        FEMALE = 2, 'FEMALE'


    class Size(models.IntegerChoices):
        LARGE = 1, 'LARGE'
        MEDIUM = 2, 'MEDIUM'
        SMALL = 3, 'SMALL'


    class Colour(models.IntegerChoices):
        UNKNOWN = 0, 'UNKNOWN'
        YELLOW = 1, 'YELLOW'
        BLACK = 2, 'BLACK'
        WHITE = 3, 'WHITE'
        BROWN = 4, 'BROWN'
        GREY = 5, 'GREY'
        RED = 6, 'RED'
        BLUE = 7, 'BLUE'
        GREEN = 8, 'GREEN'


    class Species(models.IntegerChoices):
        UNKNOWN = 0, 'UNKNOWN'
        DOG = 1, 'DOG'
        CAT = 2, 'CAT'
        BIRD = 3, 'BIRD'


    class Breed(models.IntegerChoices):
        UNKNOWN = '0', 'UNKNOWN'
        RAGDOLL = '1', 'RAGDOLL'
        LABRADOR = '2', 'LABRADOR'
        PARROT = '3', 'PARROT'


    name = models.CharField(max_length=100)
    birth_date = models.DateField(null=True, blank=True)

    sex = models.PositiveSmallIntegerField(choices=Sex.choices, default=Sex.UNKNOWN)
    species = models.PositiveSmallIntegerField(choices=Species.choices, default=Species.UNKNOWN)
    breed = models.PositiveSmallIntegerField(choices=Breed.choices, default=Breed.UNKNOWN)
    size = models.PositiveSmallIntegerField(choices=Size.choices, default=Size.MEDIUM)
    colour = models.PositiveSmallIntegerField(choices=Colour.choices, default=Colour.UNKNOWN)
    species = models.PositiveSmallIntegerField(choices=Species.choices, default=Species.UNKNOWN)
    status = models.PositiveSmallIntegerField(choices=Status.choices, default=Status.AVAILABLE)

    photo = models.ImageField(upload_to='pet_photos/', null=True, blank=True)
    medical_history = models.TextField(null=True, blank=True)
    behaviour = models.TextField(null=True, blank=True)
    special_needs = models.TextField(null=True, blank=True)
    comments = models.TextField(null=True, blank=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    shelter = models.ForeignKey("accounts.PetShelter", on_delete=models.CASCADE)
