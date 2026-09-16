from flask import Flask, jsonify
from routes.task_routes import task_routes
from routes.auth_routes import auth_routes
from flask_cors import CORS

app = Flask(__name__)


# Register all task-related API routes from the task_routes blueprint.
app.register_blueprint(task_routes)
app.register_blueprint(auth_routes)

CORS(app, origins=["https://task-manager-ochre-three.vercel.app/"])


@app.route("/")
def homepage():
    return "Welcome to our flask task manager project", 200


# If a requested route/resource doesn't exist,
# return a consistent JSON response instead of Flask's default HTML page.
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Resource not found."}), 404


# Handle unexpected server-side errors in one central place.
# Individual routes can simply call abort(500) when something goes wrong.
@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({"error": "Internal server error, please try again later."}), 500


# Start the Flask development server only when this file
# is executed directly, not when it is imported by another file.
if __name__ == "__main__":
    app.run(debug=True)
