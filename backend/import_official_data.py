import sys
import os
import logging
from datetime import datetime

# Add backend directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import engine, Base, SessionLocal
from etl.world_bank_loader import fetch_world_bank_data
from etl.imf_loader import fetch_imf_data
from etl.who_loader import fetch_who_data
from etl.un_loader import fetch_un_data
from etl.ourworldindata_loader import fetch_ourworldindata
from etl.transparency_loader import fetch_transparency_data
from etl.oxford_loader import fetch_oxford_data
from etl.startupblink_loader import fetch_startupblink_data
from etl.iqair_loader import fetch_iqair_data
from etl.load_database import load_records_to_database

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("OfficialETL")

def run_official_data_import():
    logger.info("==================================================")
    logger.info("  STARTING OFFICIAL DATASET ETL IMPORT PIPELINE   ")
    logger.info("==================================================")

    # Ensure tables exist
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    all_normalized_records = []

    try:
        # 1. World Bank API Loader
        try:
            wb_records = fetch_world_bank_data()
            all_normalized_records.extend(wb_records)
        except Exception as e:
            logger.error(f"World Bank Loader Error: {e}")

        # 2. IMF Loader
        try:
            imf_records = fetch_imf_data()
            all_normalized_records.extend(imf_records)
        except Exception as e:
            logger.error(f"IMF Loader Error: {e}")

        # 3. WHO Loader
        try:
            who_records = fetch_who_data()
            all_normalized_records.extend(who_records)
        except Exception as e:
            logger.error(f"WHO Loader Error: {e}")

        # 4. UN Loader
        try:
            un_records = fetch_un_data()
            all_normalized_records.extend(un_records)
        except Exception as e:
            logger.error(f"UN Loader Error: {e}")

        # 5. Our World In Data Loader
        try:
            owid_records = fetch_ourworldindata()
            all_normalized_records.extend(owid_records)
        except Exception as e:
            logger.error(f"OWID Loader Error: {e}")

        # 6. Transparency International CPI Loader
        try:
            cpi_records = fetch_transparency_data()
            all_normalized_records.extend(cpi_records)
        except Exception as e:
            logger.error(f"Transparency CPI Loader Error: {e}")

        # 7. Oxford Insights AI Loader
        try:
            oxford_records = fetch_oxford_data()
            all_normalized_records.extend(oxford_records)
        except Exception as e:
            logger.error(f"Oxford AI Loader Error: {e}")

        # 8. StartupBlink Loader
        try:
            startup_records = fetch_startupblink_data()
            all_normalized_records.extend(startup_records)
        except Exception as e:
            logger.error(f"StartupBlink Loader Error: {e}")

        # 9. IQAir Loader
        try:
            iqair_records = fetch_iqair_data()
            all_normalized_records.extend(iqair_records)
        except Exception as e:
            logger.error(f"IQAir Loader Error: {e}")

        logger.info(f"Total Normalized Official Records Collected: {len(all_normalized_records)}")

        # Load to DB
        stats = load_records_to_database(db, all_normalized_records)

        logger.info("==================================================")
        logger.info("  ETL PIPELINE SUMMARY REPORT                     ")
        logger.info(f"  Inserted Records : {stats['inserted']}")
        logger.info(f"  Updated Records  : {stats['updated']}")
        logger.info(f"  Skipped Records  : {stats['skipped']}")
        logger.info(f"  Failed Records   : {stats['failed']}")
        logger.info("==================================================")

    except Exception as e:
        logger.error(f"Fatal error during ETL import execution: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    run_official_data_import()
