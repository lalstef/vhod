from django.db import models

class Entrance(object):
    number_appartments = models.IntegerField(name="Брой апартаменти")


class Appartment(object):
    number = models.CharField(max_length=3, name="Номер на апартамента")
    number_habitants = models.IntegerField(name="Брой живущи")
    floor = models.PositiveSmallIntegerField(name="Етаж")
    area = models.FloatField(name="Площ на апартамента")
    notes = models.TextField(name="Бележки")


class Managers(object):
    MANAGER_TYPE_CHOICES = (
        (0, "Manager"),
        (1, "Cachier")
    )

    first_name = models.CharField(max_length=128, name="Име")
    last_name = models.CharField(max_length=128, name="Фамилия")
    office_start_date = models.DateField(name="Дата на встъпване в длъжност")
    office_end_date = models.DateField(name="Дата на напускане на длъжността")
    type = models.PositiveSmallIntegerField(choices=MANAGER_TYPE_CHOICES)


class Bill(object):
    appartment = models.ForeignKey('Appartment', name="Апартамент")
    amount = models.FloatField(name="Сума")
    for_month = models.PositiveSmallIntegerField(name="За месец")
