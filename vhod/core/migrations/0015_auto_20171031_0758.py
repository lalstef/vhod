# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-31 07:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0014_auto_20171031_0752'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appartment',
            name='number',
            field=models.PositiveIntegerField(help_text='Номер на апартамента'),
        ),
    ]
