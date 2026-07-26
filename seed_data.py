import sys
import os

# Add backend directory to sys.path
backend_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'backend')
sys.path.append(backend_dir)
os.chdir(backend_dir)

from seed_data import seed_database

if __name__ == "__main__":
    seed_database()
