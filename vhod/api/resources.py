import datetime
from django.db.models import Sum
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from vhod.core.models import RecurringBillAppartment, RecurringBillType


class ListBills(APIView):
    queryset = RecurringBillAppartment.objects.all()
    # authentication_classes = (authentication.TokenAuthentication,)
    # permission_classes = (permissions.IsAdminUser,)

    def get(self, request, format=None):
        year = int(request.GET.get('year', datetime.datetime.now().year))
        # month = int(request.GET.get('month', datetime.datetime.now().month))
        bills_structured = {}
        bills = RecurringBillAppartment.objects \
            .filter(for_month__year=year) \
            .order_by('appartment__number', 'month') \
            .values('appartment__number', 'month') \
            .annotate(amount=Sum('amount'))
            # .values('appartment__number', 'amount', 'month', 'paid_date')

        for bill in bills:
            appartment_number = str(bill['appartment__number'])
            if appartment_number not in bills_structured:
                bills_structured[appartment_number] = []
            bills_structured[appartment_number].append({
                'month': bill['month'],
                'amount': '{:0.2f}'.format(bill['amount']),
                'paid_date': bill.get('paid_date')
            })

        return Response(bills_structured)


class ListMonthlyBills(APIView):
    queryset = RecurringBillAppartment.objects.all()
    # authentication_classes = (authentication.TokenAuthentication,)
    # permission_classes = (permissions.IsAdminUser,)

    def get(self, request, **kwargs):
        year = int(kwargs.get('year', datetime.datetime.now().year))
        month = int(kwargs.get('month', '0')) + 1

        bills_structured = {}
        bills = RecurringBillAppartment.objects \
            .select_related('appartment') \
            .filter(for_month__year=year, for_month__month=month) \
            .order_by('appartment__number', 'month')

        for bill in bills:
            app_number = bill.appartment.number

            if app_number not in bills_structured:
                bills_structured[app_number] = {
                    'number': app_number,
                    'paid_date': bill.paid_date,
                    'number_habitants': 0,
                    'bills': {
                        'cleaning': None,
                        'elevator_maintenance': None,
                        'elevator_electricity': None,
                        'electricity_stairs': None,
                        'maintenance': None,
                        'total': 0.0,
                    },
                }

            bills_structured[app_number]['bills']['total'] += bill.amount

            if bill.type.id == RecurringBillType.RECURRING_BILL_TYPE_CLEANING:
                bills_structured[app_number]['bills']['cleaning'] = bill.amount
            elif bill.type.id == RecurringBillType.RECURRING_BILL_TYPE_ELEVATOR_ELECTRICITY:
                bills_structured[app_number]['bills']['elevator_electricity'] = bill.amount
            elif bill.type.id == RecurringBillType.RECURRING_BILL_TYPE_ELEVATOR_MAINTENANCE:
                bills_structured[app_number]['bills']['elevator_maintenance'] = bill.amount
            elif bill.type.id == RecurringBillType.RECURRING_BILL_TYPE_ELECTRICITY_STAIRS:
                bills_structured[app_number]['bills']['electricity_stairs'] = bill.amount
            elif bill.type.id == RecurringBillType.RECURRING_BILL_TYPE_MAINTENANCE:
                bills_structured[app_number]['bills']['maintenance'] = bill.amount

        return Response(bills_structured)


class ListAppartmentBills(APIView):
    queryset = RecurringBillAppartment.objects.all()
    # authentication_classes = (authentication.TokenAuthentication,)
    # permission_classes = (permissions.IsAdminUser,)

    def get(self, request, **kwargs):
        year = int(kwargs.get('year', datetime.datetime.now().year))
        appartment = int(kwargs.get('appartment', '84'))

        bills_structured = [{'total': 0}, {'total': 0}, {'total': 0}, {'total': 0}, {'total': 0}, {'total': 0}, {'total': 0}, {'total': 0}, {'total': 0}, {'total': 0}, {'total': 0}, {'total': 0}, ]
        bills = RecurringBillAppartment.objects \
            .filter(for_month__year=year, appartment__number=appartment) \
            .order_by('month')

        for bill in bills:
            month = bill.for_month.month - 1
            bills_structured[month]['paid'] = bill.paid_date is not None
            bills_structured[month]['total'] += bill.amount

            if bill.type.id == RecurringBillType.RECURRING_BILL_TYPE_CLEANING:
                bills_structured[month]['cleaning'] = bill.amount
            elif bill.type.id == RecurringBillType.RECURRING_BILL_TYPE_ELEVATOR_ELECTRICITY:
                bills_structured[month]['elevator_electricity'] = bill.amount
            elif bill.type.id == RecurringBillType.RECURRING_BILL_TYPE_ELEVATOR_MAINTENANCE:
                bills_structured[month]['elevator_maintenance'] = bill.amount
            elif bill.type.id == RecurringBillType.RECURRING_BILL_TYPE_ELECTRICITY_STAIRS:
                bills_structured[month]['electricity_stairs'] = bill.amount
            elif bill.type.id == RecurringBillType.RECURRING_BILL_TYPE_MAINTENANCE:
                bills_structured[month]['maintenance'] = bill.amount

        return Response(bills_structured)
