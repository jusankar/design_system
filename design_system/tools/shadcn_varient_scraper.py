import requests
from crewai.tools import tool

BASE_DOC = "https://ui.shadcn.com/docs/components"
RADIX_PREFIX = "radix"


@tool("shadcn_varient_scraper")
def shadcn_varient_scraper(component_name: str) -> dict:
    """
    Fetch raw markdown from ShadCN component docs.

    Input:
        component_name (str) – e.g. "input"

    Output:
        dict containing raw markdown
    """
    component_path = f"{RADIX_PREFIX}/{component_name}"
    url = f"{BASE_DOC}/{component_path}.md"

    print(f"🔎 Scraping: {url}")

    response = requests.get(url, timeout=30)
    response.raise_for_status()

    return {
        "component_name": component_name,
        "markdown": response.text
    }
