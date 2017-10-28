from django.contrib import admin
from vhod.core.models import Entrance, Appartment, AppartmentHabitants, Managers, AppartmentBill, RecurringBillType, RecurringBill


class AppartmentAdmin(admin.ModelAdmin):
    list_display = ('number', 'floor', 'area')

admin.site.register(Entrance)
admin.site.register(Appartment, AppartmentAdmin)
admin.site.register(AppartmentHabitants)
admin.site.register(Managers)
admin.site.register(AppartmentBill)
admin.site.register(RecurringBillType)
admin.site.register(RecurringBill)
