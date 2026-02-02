import json
from playwright.sync_api import sync_playwright
from crewai.tools import tool

@tool("shadcn_component_scraper")
def shadcn_component_scraper(component_name: str) -> dict:
    """
    CrewAI tool to scrape a ShadCN component's demo/installation code.

    Steps:
    - Go to the component page
    - Wait for 'Installation' section
    - Click the 'Manual' tab
    - Grab the first code block under Manual tab
    """

    url = f"https://ui.shadcn.com/docs/components/radix/{component_name}"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url, wait_until="networkidle")

        # Wait for Installation section
        page.wait_for_selector("h2:text('Installation')")

        # Click Manual tab
        manual_tab = page.locator("button", has_text="Manual")
        manual_tab.wait_for(state="visible")
        manual_tab.click()

        # Wait for first code block after Installation heading
        code_block = page.locator("h2:text('Installation') ~ div pre code").first
        code_block.wait_for(state="visible")

        code_text = code_block.inner_text()

        browser.close()

    # Return JSON object for CrewAI
    return {
        "component_code": code_text,
        "component_name": component_name
    }


# ✅ Optional main() for standalone testing
if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python shadcn_component_scraper.py <component_name>")
        sys.exit(1)

    component_name = sys.argv[1]
    result = shadcn_component_scraper(component_name)
    print(json.dumps(result, indent=2))
