# Generated by Django 4.2.7 on 2023-12-09 20:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ApplicationForm',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('shelter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.petshelter')),
            ],
        ),
        migrations.CreateModel(
            name='ApplicationQuestion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('object_id', models.PositiveIntegerField()),
                ('application_form', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='pets.applicationform')),
                ('question_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.contenttype')),
            ],
            options={
                'unique_together': {('question_type', 'object_id')},
            },
        ),
        migrations.CreateModel(
            name='CheckboxPrompt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.PositiveSmallIntegerField(choices=[(1, 'Textarea'), (2, 'Dropdown'), (3, 'Radio'), (4, 'Checkbox'), (5, 'File')], default=4)),
                ('prompt', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='CheckboxResponse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.PositiveSmallIntegerField(choices=[(1, 'Textarea'), (2, 'Dropdown'), (3, 'Radio'), (4, 'Checkbox'), (5, 'File')], default=4)),
                ('response', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='DropdownPrompt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.PositiveSmallIntegerField(choices=[(1, 'Textarea'), (2, 'Dropdown'), (3, 'Radio'), (4, 'Checkbox'), (5, 'File')], default=2)),
                ('prompt', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='DropdownResponse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.PositiveSmallIntegerField(choices=[(1, 'Textarea'), (2, 'Dropdown'), (3, 'Radio'), (4, 'Checkbox'), (5, 'File')], default=2)),
                ('response', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='FilePrompt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.PositiveSmallIntegerField(choices=[(1, 'Textarea'), (2, 'Dropdown'), (3, 'Radio'), (4, 'Checkbox'), (5, 'File')], default=5)),
                ('prompt', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='FileResponse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.PositiveSmallIntegerField(choices=[(1, 'Textarea'), (2, 'Dropdown'), (3, 'Radio'), (4, 'Checkbox'), (5, 'File')], default=5)),
                ('response', models.FileField(upload_to='files/')),
            ],
        ),
        migrations.CreateModel(
            name='RadioPrompt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.PositiveSmallIntegerField(choices=[(1, 'Textarea'), (2, 'Dropdown'), (3, 'Radio'), (4, 'Checkbox'), (5, 'File')], default=3)),
                ('prompt', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='RadioResponse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.PositiveSmallIntegerField(choices=[(1, 'Textarea'), (2, 'Dropdown'), (3, 'Radio'), (4, 'Checkbox'), (5, 'File')], default=3)),
                ('response', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='TextareaPrompt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.PositiveSmallIntegerField(choices=[(1, 'Textarea'), (2, 'Dropdown'), (3, 'Radio'), (4, 'Checkbox'), (5, 'File')], default=1)),
                ('prompt', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='TextareaResponse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.PositiveSmallIntegerField(choices=[(1, 'Textarea'), (2, 'Dropdown'), (3, 'Radio'), (4, 'Checkbox'), (5, 'File')], default=1)),
                ('response', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Pet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('sex', models.PositiveSmallIntegerField(choices=[(0, 'UNKNOWN'), (1, 'MALE'), (2, 'FEMALE')], default=0)),
                ('breed', models.PositiveSmallIntegerField(choices=[(0, 'UNKNOWN'), (1, 'RAGDOLL'), (2, 'SIAMESE'), (3, 'PERSIAN'), (4, 'SPHYNX'), (5, 'LABRADOR'), (6, 'GOLDEN_RETRIEVER'), (7, 'BULLDOG'), (8, 'BEAGLE'), (9, 'PARROT'), (10, 'COCKATIEL'), (11, 'MACAW'), (12, 'CANARY')], default=0)),
                ('size', models.PositiveSmallIntegerField(choices=[(1, 'LARGE'), (2, 'MEDIUM'), (3, 'SMALL')], default=2)),
                ('colour', models.PositiveSmallIntegerField(choices=[(0, 'UNKNOWN'), (1, 'YELLOW'), (2, 'BLACK'), (3, 'WHITE'), (4, 'BROWN'), (5, 'GREY'), (6, 'RED'), (7, 'BLUE'), (8, 'GREEN')], default=0)),
                ('species', models.PositiveSmallIntegerField(choices=[(0, 'UNKNOWN'), (1, 'DOG'), (2, 'CAT'), (3, 'BIRD')], default=0)),
                ('status', models.PositiveSmallIntegerField(choices=[(1, 'ADOPTED'), (2, 'AVAILABLE')], default=2)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='pet_photos/')),
                ('medical_history', models.TextField(blank=True, null=True)),
                ('behaviour', models.TextField(blank=True, null=True)),
                ('special_needs', models.TextField(blank=True, null=True)),
                ('comments', models.TextField(blank=True, null=True)),
                ('weight', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('form', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='pets.applicationform')),
                ('shelter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.petshelter')),
            ],
        ),
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.PositiveSmallIntegerField(choices=[(1, 'Pending'), (2, 'Approved'), (3, 'Denied'), (4, 'Withdrawn')], default=1)),
                ('last_updated', models.DateTimeField(auto_now=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('applicant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='applications', to='accounts.petseeker')),
                ('form', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pets.applicationform')),
                ('pet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pets.pet')),
            ],
        ),
        migrations.CreateModel(
            name='QuestionResponse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('object_id', models.PositiveIntegerField()),
                ('application', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='pets.application')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pets.applicationquestion')),
                ('response_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.contenttype')),
            ],
            options={
                'unique_together': {('response_type', 'object_id')},
            },
        ),
    ]