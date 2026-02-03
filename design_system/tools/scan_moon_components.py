import os
from crewai.tools import tool

@tool("scan_moon_components")
def scan_moon_components() -> list[str]:
    """
    Scan moon/src/components and return component folder names.
    """
    base_dir = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..", "..", "moon", "src", "components")
    )

    if not os.path.exists(base_dir):
        return []

    return sorted([
        name
        for name in os.listdir(base_dir)
        if os.path.isdir(os.path.join(base_dir, name))
    ])
