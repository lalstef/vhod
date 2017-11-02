import datetime

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Entrance(models.Model):
    number_appartments = models.IntegerField(help_text="Брой апартаменти")


class RecurringBillType(models.Model):
    RECURRING_BILL_TYPE_CLEANING = 1
    RECURRING_BILL_TYPE_ELEVATOR_MAINTENANCE = 2
    RECURRING_BILL_TYPE_ELEVATOR_ELECTRICITY = 3
    RECURRING_BILL_TYPE_ELECTRICITY_STAIRS = 4
    RECURRING_BILL_TYPE_MAINTENANCE = 5

    name = models.CharField(max_length=256)

    def __str__(self):
        return self.name


class Appartment(models.Model):
    number = models.PositiveIntegerField(help_text="Номер на апартамента")
    floor = models.PositiveSmallIntegerField(help_text="Етаж")
    area = models.FloatField(help_text="Площ на апартамента", null=True, blank=True)
    common_part_percent = models.FloatField(help_text="Процент идеални части")
    common_part_percent_rounded = models.FloatField(help_text="Процент идеални части (закръглен)")
    pay_for_elevator_electricity = models.BooleanField(default=True)
    pay_for_elevator_maintenance = models.BooleanField(default=True)
    notes = models.TextField(help_text="Бележки", null=True, blank=True)

    def __str__(self):
        return '{}'.format(self.number)

    def should_pay_bill(self, bill_type):
        if (bill_type.id == RecurringBillType.RECURRING_BILL_TYPE_ELEVATOR_MAINTENANCE
                and self.pay_for_elevator_maintenance is False):
            return False

        if (bill_type.id == RecurringBillType.RECURRING_BILL_TYPE_ELEVATOR_ELECTRICITY
                and self.pay_for_elevator_electricity is False):
            return False

        return True


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


class RecurringBillAppartment(models.Model):
    appartment = models.ForeignKey("Appartment", help_text="Апартамент")
    type = models.ForeignKey("RecurringBillType")
    amount = models.FloatField(help_text="Сума")
    for_month = models.DateField(help_text="Месец/Година")
    year = models.PositiveIntegerField(help_text="Година")
    month = models.PositiveIntegerField(help_text="Месец")
    paid_date = models.DateField(help_text="Дата на плащане", null=True, blank=True)

    def __str__(self):
        return "Ап.{} ({}): {} лв, {:%B %Y}".format(self.appartment, self.type.name, self.amount, self.for_month)

    def is_paid(self):
        return self.paid_date is not None

    def get_monthly_bills(self, year, month):
        return RecurringBill.objects\
            .filter(for_month=datetime.datetime(year, month, 1))\
            .order_by(self.appartment.number)



class RecurringBill(models.Model):
    type = models.ForeignKey("RecurringBillType")
    amount = models.FloatField(help_text="Сума")
    for_month = models.DateField(help_text="Месец/Година")

    def __str__(self):
        return "{}: {} лв, {:%B %Y}".format(self.type.name, self.amount, self.for_month)

    def calculate_appartment_bills(self, create_records=False):
        appartment_bills = []

        if self.type == RecurringBillType.RECURRING_BILL_TYPE_ELEVATOR_MAINTENANCE:
            habitants_per_appartment = AppartmentHabitants.objects.filter(
                month=self.for_month, appartment__pay_for_elevator_maintenance=True)
            total_habitants = AppartmentHabitants.objects.filter(
                month=self.for_month, appartment__pay_for_elevator_maintenance=True).count()
        elif self.type == RecurringBillType.RECURRING_BILL_TYPE_ELEVATOR_ELECTRICITY:
            habitants_per_appartment = AppartmentHabitants.objects.filter(
                month=self.for_month, appartment__pay_for_elevator_electricity=True)
            total_habitants = AppartmentHabitants.objects.filter(
                month=self.for_month, appartment__pay_for_elevator_electricity=True).count()
        else:
            habitants_per_appartment = AppartmentHabitants.objects.filter(month=self.for_month)
            total_habitants = AppartmentHabitants.objects.filter(month=self.for_month).count()

        amount_per_habitant = self.amount / total_habitants
        for habitants_per_appartment in habitants_per_appartment:
            amount = 0
            if habitants_per_appartment.appartment.should_pay_bill(self.type):
                amount = habitants_per_appartment.number * amount_per_habitant

            appartment_bills.append(
                RecurringBillAppartment(
                    appartment=habitants_per_appartment.appartment,
                    amount=amount,
                    type=self.type,
                    for_month=self.for_month
                )
            )

        if create_records:
            RecurringBillAppartment.objects.bulk_create(appartment_bills)
        return appartment_bills

    def __str__(self):
        return "{}: {} лв, {:%B %Y}".format(self.type.name, self.amount, self.for_month)


@receiver(post_save, sender=RecurringBill)
def calculate_appartment_bills(sender, **kwargs):
    bill = kwargs['instance']
    appartment_bills = bill.calculate_appartment_bills()
    RecurringBillAppartment.objects.bulk_create(appartment_bills)
