import threading

from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from .serializers import ImageAnalysisSerializer
from .healthera_ai import HealtheraAI
from .models import ImageAnalysis

ai = HealtheraAI()


def process_image_async(image_analysis_id):
    try:
        image_analysis = ImageAnalysis.objects.get(id=image_analysis_id)
        print(image_analysis.image.path)
        response_text = ai.analyze_image(image_analysis.image.path)
        image_analysis.result = response_text
        image_analysis.status = 'completed'
    except Exception as e:
        image_analysis.status = 'failed'
        image_analysis.result = str(e)
    finally:
        image_analysis.save()
        print(image_analysis)


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_image(request):
    if 'image' not in request.FILES:
        return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)

    image = request.FILES['image']
    # file_name = default_storage.save(image.name, image)
    # file_path = default_storage.path(file_name)
    image_analysis = ImageAnalysis.objects.create(image=image, user=request.user)

    # Start the asynchronous processing of the image
    threading.Thread(target=process_image_async, args=(image_analysis.id,)).start()

    # Return the UUID and a 202 status code
    return JsonResponse({'uuid': str(image_analysis.id)}, status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_analysis(request, uuid):
    try:
        image_analysis = ImageAnalysis.objects.get(id=uuid)
        if image_analysis.status == 'pending':
            return JsonResponse({'status': 'pending'})
        return JsonResponse({
            'status': 'completed',
            'result': image_analysis.result
        })
    except ImageAnalysis.DoesNotExist:
        return Response({'error': 'Invalid UUID'}, status=status.HTTP_404_NOT_FOUND)


class UserImageAnalysisListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        paginator = PageNumberPagination()
        paginator.page_size = 10  # Set the number of items per page

        user_analyses = ImageAnalysis.objects.filter(
            user=request.user).order_by('-created_at')
        result_page = paginator.paginate_queryset(user_analyses, request)

        serializer = ImageAnalysisSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)


class RecentUserImageAnalysisListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get the 50 most recent "completed" items
        user_analyses = ImageAnalysis.objects.filter(
            user=request.user, status='completed'
        ).order_by('-created_at')[:50]

        serializer = ImageAnalysisSerializer(user_analyses, many=True)
        return Response(serializer.data)
