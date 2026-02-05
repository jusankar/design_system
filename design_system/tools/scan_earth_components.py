import os
import re
from typing import List, Dict
from crewai.tools import tool


@tool("scan_earth_components")
def scan_earth_components() -> List[Dict]:
    """
    Scans earth/src/components/** for *Demo.tsx files
    Extracts imports and JSX demo code
    """

    REPO_ROOT = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..", "..")
    )
    EARTH_ROOT = os.path.join(REPO_ROOT, "earth", "src", "components")

    print("Scanning:", EARTH_ROOT)

    components = []

    for root, _, files in os.walk(EARTH_ROOT):
        for file in files:
            if not file.lower().endswith("demo.tsx"):
                continue

            path = os.path.join(root, file)
            print("Found demo:", path)

            with open(path, "r", encoding="utf-8") as f:
                content = f.read()

            imports = re.findall(
                r"^import .* from ['\"].*['\"]",
                content,
                re.MULTILINE,
            )

            match = re.search(
                r"return\s*\(\s*([\s\S]*?)\s*\)\s*;?",
                content,
            )

            if not match:
                match = re.search(
                    r"=>\s*\(\s*([\s\S]*?)\s*\)",
                    content,
                )

            if not match:
                print("⚠️  No JSX found in", path)
                continue

            components.append({
                "name": os.path.basename(root),
                "imports": imports,
                "jsx": match.group(1).strip(),
            })

    return components


if __name__ == "__main__":
    result = scan_earth_components()
    print(f"\n✅ Found {len(result)} components")
    for c in result:
        print("-", c["name"])
        print("-", c["imports"])
        print("-", c["jsx"])

