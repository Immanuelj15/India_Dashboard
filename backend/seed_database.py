import sys
import os
import logging

# Add backend directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import engine, Base, SessionLocal
from app.models import Country, Category, Indicator
from seed.countries_seed import COUNTRIES_SEED_DATA
from seed.categories_seed import CATEGORIES_SEED_DATA
from seed.indicators_seed import INDICATORS_SEED_DATA

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("StaticSeeder")

def seed_static_metadata():
    logger.info("Initializing Database Tables...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # 1. Seed Countries
        logger.info("Seeding Countries...")
        country_count = 0
        for cdata in COUNTRIES_SEED_DATA:
            existing = db.query(Country).filter(Country.code == cdata["code"]).first()
            if not existing:
                country = Country(**cdata)
                db.add(country)
                country_count += 1
        db.commit()
        logger.info(f"Seeded {country_count} new countries.")

        # 2. Seed Categories
        logger.info("Seeding Categories...")
        category_count = 0
        for cat_data in CATEGORIES_SEED_DATA:
            existing = db.query(Category).filter(Category.slug == cat_data["slug"]).first()
            if not existing:
                category = Category(**cat_data)
                db.add(category)
                category_count += 1
        db.commit()
        logger.info(f"Seeded {category_count} new categories.")

        # Map category slug to id
        cat_map = {c.slug: c.id for c in db.query(Category).all()}

        # 3. Seed Indicators
        logger.info("Seeding Indicators...")
        indicator_count = 0
        for ind_data in INDICATORS_SEED_DATA:
            cat_slug = ind_data.get("category_slug")
            cat_id = cat_map.get(cat_slug)
            if not cat_id:
                logger.warning(f"Category slug '{cat_slug}' not found for indicator '{ind_data['name']}'")
                continue

            existing = db.query(Indicator).filter(Indicator.slug == ind_data["slug"]).first()
            if not existing:
                indicator = Indicator(
                    slug=ind_data["slug"],
                    name=ind_data["name"],
                    category_id=cat_id,
                    unit=ind_data.get("unit"),
                    description=ind_data.get("description"),
                    lower_is_better=ind_data.get("lower_is_better", False),
                    higher_is_better=not ind_data.get("lower_is_better", False),
                )
                db.add(indicator)
                indicator_count += 1
        db.commit()
        logger.info(f"Seeded {indicator_count} new static indicators.")

        logger.info("Static Database Metadata Seeding Completed Successfully!")
    except Exception as e:
        db.rollback()
        logger.error(f"Error seeding static metadata: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_static_metadata()
