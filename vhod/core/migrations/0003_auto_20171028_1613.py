# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-28 16:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20171028_1552'),
    ]

    operations = [
        migrations.CreateModel(
            name='AppartmentHabitants',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Брой живущи', models.IntegerField()),
                ('Месец', models.PositiveSmallIntegerField()),
            ],
        ),
        migrations.RemoveField(
            model_name='appartment',
            name='Брой живущи',
        ),
    ]
