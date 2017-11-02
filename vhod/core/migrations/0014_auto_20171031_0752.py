# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-31 07:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0013_recurringbillappartment_paid_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='recurringbillappartment',
            name='month',
            field=models.PositiveIntegerField(default=1, help_text='Месец'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='recurringbillappartment',
            name='year',
            field=models.PositiveIntegerField(default=1, help_text='Година'),
            preserve_default=False,
        ),
    ]
