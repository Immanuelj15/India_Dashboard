import sys
import os
import importlib.util

# Target backend directory explicitly
backend_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'backend')
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)
os.chdir(backend_dir)

# Load backend/seed_data.py module directly by file path
seed_script = os.path.join(backend_dir, "seed_data.py")
spec = importlib.util.spec_from_file_location("backend_seed_data", seed_script)
backend_seed = importlib.util.module_from_spec(spec)
spec.loader.exec_module(backend_seed)

if __name__ == "__main__":
    backend_seed.seed_database()
