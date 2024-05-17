from flask.cli import AppGroup
from .users import seed_users, undo_users
from .shops import seed_shops, undo_shops
from .selected_categories import seed_selected_categories, undo_selected_categories
from .reviews import seed_reviews, undo_reviews
from .menus import seed_menus, undo_menus
from .images import seed_images, undo_images
from .categories import seed_categories, undo_categories
from .addresses import seed_addresses, undo_addresses

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_shops()
        undo_reviews()
        undo_menus()
        undo_images()
        undo_categories()
        undo_selected_categories()
        undo_addresses()
    seed_users()
    seed_shops()
    seed_selected_categories()
    seed_reviews()
    seed_menus()
    seed_images()
    seed_categories()
    seed_addresses()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_shops()
    undo_reviews()
    undo_menus()
    undo_images()
    undo_categories()
    undo_selected_categories()
    undo_addresses()
    # Add other undo functions here
