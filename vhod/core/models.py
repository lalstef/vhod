from django.db import models


class Entrance(models.Model):
    number_appartments = models.IntegerField(help_text="Брой апартаменти")


class Appartment(models.Model):
    number = models.CharField(max_length=3, help_text="Номер на апартамента")
    floor = models.PositiveSmallIntegerField(help_text="Етаж")
    area = models.FloatField(help_text="Площ на апартамента", null=True, blank=True)
    notes = models.TextField(help_text="Бележки", null=True, blank=True)

    def __str__(self):
        # return self.number
        return "%s" % self.number

class AppartmentHabitants(models.Model):
    appartment = models.ForeignKey('Appartment', help_text="Апартамент")
    number = models.IntegerField(help_text="Брой живущи")
    month = models.DateField(help_text="Месец/Година")

    def __str__(self):
        return "#{} - живущи: {} ({:%B, %Y})".format(self.appartment.number, self.number, self.month)


class Managers(models.Model):
    MANAGER_TYPE_CHOICES = (
        (0, "Manager"),
        (1, "Cachier")
    )

    first_name = models.CharField(max_length=128, help_text="Име")
    last_name = models.CharField(max_length=128, help_text="Фамилия")
    office_start_date = models.DateField(help_text="Дата на встъпване в длъжност", null=True, blank=True)
    office_end_date = models.DateField(help_text="Дата на напускане на длъжността", null=True, blank=True)
    type = models.PositiveSmallIntegerField(choices=MANAGER_TYPE_CHOICES)


    def set_cachier(self, first_help_text, last_help_text, office_start_date, office_end_date):
        pass

    def set_manager(self, first_help_text, last_help_text, office_start_date, office_end_date):
        pass


class AppartmentBill(models.Model):
    appartment = models.ForeignKey("Appartment", help_text="Апартамент")
    amount = models.FloatField(help_text="Сума")
    for_month = models.DateField(help_text="Месец/Година")
    paid = models.BooleanField(default=False)


class RecurringBillType(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return self.name

class RecurringBill(models.Model):
    type = models.ForeignKey("RecurringBillType")
    amount = models.FloatField(help_text="Сума")
    for_month = models.DateField(help_text="Месец/Година")

    def __str__(self):
        return "{}: {} лв, {:%B %Y}".format(self.type.name, self.amount, self.for_month)
