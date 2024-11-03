# Generated by Django 5.1.2 on 2024-10-29 22:24

import django.contrib.auth.models
import django.contrib.auth.validators
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Actividad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo', models.CharField(choices=[('juego', 'juego'), ('prueba', 'prueba')], max_length=20)),
                ('descripcion', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('imagen_url', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('rol', models.CharField(choices=[('estudiante', 'estudiante'), ('profesor', 'profesor'), ('padre', 'padre')], max_length=20)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='EstudianteActividad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField(default=0)),
                ('completado_en', models.DateTimeField(auto_now_add=True)),
                ('actividad', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='estudiante_actividad', to='flashcards.actividad')),
                ('estudiante', models.ForeignKey(limit_choices_to={'rol': 'estudiante'}, on_delete=django.db.models.deletion.CASCADE, related_name='estudiante_actividad', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Flashcard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('palabra', models.CharField(max_length=300)),
                ('traduccion', models.CharField(max_length=300)),
                ('imagen_url', models.URLField()),
                ('audio_url', models.URLField()),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('categoria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='flashcards.categoria')),
            ],
        ),
        migrations.CreateModel(
            name='EstudianteProgresos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('estado', models.CharField(choices=[('pendiente', 'pendiente'), ('completado', 'completado')], max_length=20)),
                ('intentos', models.IntegerField(default=0)),
                ('ultima_vez', models.DateTimeField(auto_now_add=True)),
                ('estudiante', models.ForeignKey(limit_choices_to={'rol': 'estudiante'}, on_delete=django.db.models.deletion.CASCADE, related_name='progreso', to=settings.AUTH_USER_MODEL)),
                ('flashcard', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='progreso', to='flashcards.flashcard')),
            ],
        ),
        migrations.AddField(
            model_name='actividad',
            name='flashcard',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='actividad', to='flashcards.flashcard'),
        ),
        migrations.CreateModel(
            name='PadreEstudiante',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('estudiante', models.ForeignKey(limit_choices_to={'rol': 'estudiante'}, on_delete=django.db.models.deletion.CASCADE, related_name='padre', to=settings.AUTH_USER_MODEL)),
                ('padre', models.ForeignKey(limit_choices_to={'rol': 'padre'}, on_delete=django.db.models.deletion.CASCADE, related_name='hijos', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]