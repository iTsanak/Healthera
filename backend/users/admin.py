from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User


class UserAdmin(UserAdmin):
    model = User
    # Display fields in the list view
    list_display = ('username', 'email', 'first_name', 'phone_number',
                    'last_name', 'is_staff', 'profile_image_url', 'device_id')
    # Fields to be used in displaying the User model in the admin view
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {
         'fields': ('first_name', 'last_name', 'email', 'profile_image_url', 'phone_number')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff',
         'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
        (_('Devices'), {'fields': ('device_id',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2'),
        }),
    )
    search_fields = ('username', 'first_name',
                     'last_name', 'email', 'phone_number')
    ordering = ('username',)


# Register the custom admin class with the associated model
admin.site.register(User, UserAdmin)
