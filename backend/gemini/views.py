from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from .healthera_ai import HealtheraAI
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
@api_view(['POST'])
def upload_image(request):
    parser_classes = (MultiPartParser, FormParser)

    if 'image' not in request.FILES:
        return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)

    image = request.FILES['image']
    file_name = default_storage.save(image.name, image)
    file_path = default_storage.path(file_name)
    
    # Process the image with Gemini API
    ai = HealtheraAI()
    response_text = ai.analyze_image(file_name)

    return JsonResponse({'analysis': response_text})
