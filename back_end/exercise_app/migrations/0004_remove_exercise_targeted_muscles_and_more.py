# Generated by Django 4.2.4 on 2023-08-13 18:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exercise_app', '0003_alter_exercise_reps_alter_exercise_sets'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='exercise',
            name='targeted_muscles',
        ),
        migrations.AddField(
            model_name='exercise',
            name='targeted_muscles',
            field=models.CharField(default='chest'),
            preserve_default=False,
        ),
    ]
