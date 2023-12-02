# from rest_framework.response import Response
# from rest_framework.views import APIView
# from .models import Table1, Table2
# from .serializers import Table1Serializer, Table2Serializer

# class CombinedDataView(APIView):
#     def get(self, request):
#         table1_data = Table1.objects.all()
#         table2_data = Table2.objects.all()

#         table1_serializer = Table1Serializer(table1_data, many=True)
#         table2_serializer = Table2Serializer(table2_data, many=True)

#         combined_data = {
#             'table1': table1_serializer.data,
#             'table2': table2_serializer.data,
#         }

#         return Response(combined_data)