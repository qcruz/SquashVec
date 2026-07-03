from datetime import date
from flask import Flask
from .db import init_db, close_db


def create_app():
    app = Flask(__name__, template_folder="templates", static_folder="static")
    app.secret_key = "planner-dev-2026-austin"
    # Single-user dev mode: always log in as this user if no session exists.
    # Set to None to require onboarding flow.
    app.config["DEFAULT_USER_ID"] = 2

    with app.app_context():
        init_db()

    app.teardown_appcontext(close_db)

    @app.context_processor
    def inject_globals():
        return {
            "today_str": date.today().isoformat(),
            "date_str":  date.today().isoformat(),  # overridden by day_view
        }

    from .routes import bp
    app.register_blueprint(bp)

    return app
