import json
from playwright.sync_api import sync_playwright
from crewai.tools import tool


@tool("shadcn_component_scraper")
def shadcn_component_scraper(component_name: str) -> dict:
    """
    Scrapes the ShadCN component TSX code from:
    Installation → Manual tab → 
    'Copy and paste the following code into your project.'
    """

    url = f"https://ui.shadcn.com/docs/components/radix/{component_name}"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url, wait_until="networkidle")

        # 1. Wait for Installation section
        page.wait_for_selector("h2:text('Installation')")

        # 2. Click Manual tab
        manual_tab = page.locator("button", has_text="Manual")
        manual_tab.wait_for(state="visible")
        manual_tab.click()

        # 3. Locate the heading text (semantic anchor)
        heading = page.locator(
            "text=Copy and paste the following code into your project."
        )
        heading.wait_for(state="visible")

        # 4. Extract the code block immediately following that heading
        code_block = heading.locator("xpath=following::pre[1]/code")
        code_block.wait_for(state="visible")

        code_text = code_block.inner_text().strip()

        browser.close()

    return {
        "component_code": code_text,
        "component_name": component_name,
    }


# Optional standalone test
if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        print("Usage: python shadcn_component_scraper.py <component_name>")
        sys.exit(1)

    component_name = sys.argv[1]
    result = shadcn_component_scraper(component_name)
    print(json.dumps(result, indent=2))
