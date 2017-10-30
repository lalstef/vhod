from django.contrib import admin
from vhod.core.models import (
    Entrance, Appartment, AppartmentHabitants, Managers, AppartmentBill, RecurringBillType, RecurringBill,
    RecurringBillAppartment
)


class AppartmentAdmin(admin.ModelAdmin):
    list_display = ('number', 'floor', 'common_part_percent_rounded', 'common_part_percent', 'pay_for_elevator_electricity',
                    'pay_for_elevator_maintenance')


class RecurringBillTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

class RecurringBillAppartmentAdmin(admin.ModelAdmin):
    list_display = ('appartment', 'type', 'amount', 'for_month')


admin.site.register(Entrance)
admin.site.register(Appartment, AppartmentAdmin)
admin.site.register(AppartmentHabitants)
admin.site.register(Managers)
admin.site.register(AppartmentBill)
admin.site.register(RecurringBillType, RecurringBillTypeAdmin)
admin.site.register(RecurringBill)
admin.site.register(RecurringBillAppartment, RecurringBillAppartmentAdmin)
