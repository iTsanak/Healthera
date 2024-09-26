from django.contrib import admin
from .models import ImageAnalysis


@admin.register(ImageAnalysis)
class ImageAnalysisAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'created_at', 'updated_at')
    search_fields = ('user__username', 'status')
    list_filter = ('status', 'created_at', 'updated_at')
    readonly_fields = ('id', 'created_at', 'updated_at')

    def get_readonly_fields(self, request, obj=None):
        if obj:  # Editing an existing object
            return self.readonly_fields + ('user', 'image', 'result')
        return self.readonly_fields

    # def has_add_permission(self, request):
    #     return False  # Disable adding new ImageAnalysis from the admin

    # def has_delete_permission(self, request, obj=None):
    #     return False  # Disable deleting ImageAnalysis from the admin
