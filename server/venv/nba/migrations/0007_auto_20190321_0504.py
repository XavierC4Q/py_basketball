# Generated by Django 2.1.7 on 2019-03-21 05:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nba', '0006_auto_20190321_0503'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='college',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
