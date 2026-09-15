# Validation functions


def validate_task_desc(task_desc):

    if task_desc is None:
        return "Description cannot be null."

    if not isinstance(task_desc, str):
        return "description must be a string."

    if task_desc.strip() == "":
        return "Description cannot be empty."

    return None


def validate_json_body(data):
    if not isinstance(data, dict):
        return "JSON body must be an object"

    return None

