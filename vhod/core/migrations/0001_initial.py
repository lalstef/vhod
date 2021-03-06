# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-28 15:48
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Appartment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Номер на апартамента', models.CharField(max_length=3)),
                ('Брой живущи', models.IntegerField()),
                ('Етаж', models.PositiveSmallIntegerField()),
                ('Площ на апартамента', models.FloatField()),
                ('Бележки', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Bill',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Сума', models.FloatField()),
                ('За месец', models.PositiveSmallIntegerField()),
                ('Апартамент', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Appartment')),
            ],
        ),
        migrations.CreateModel(
            name='Entrance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Брой апартаменти', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Managers',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Име', models.CharField(max_length=128)),
                ('Фамилия', models.CharField(max_length=128)),
                ('Дата на встъпване в длъжност', models.DateField()),
                ('Дата на напускане на длъжността', models.DateField()),
                ('type', models.PositiveSmallIntegerField(choices=[(0, 'Manager'), (1, 'Cachier')])),
            ],
        ),
    ]
