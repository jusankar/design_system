import os


def aggregate_components():
    BASE_DIR = os.path.dirname(__file__)
    EARTH_ROOT = os.path.abspath(os.path.join(BASE_DIR, "..", "..", "earth"))

    COMPONENTS_DIR = os.path.join(EARTH_ROOT, "src", "components")
    PAGES_DIR = os.path.join(EARTH_ROOT, "src", "pages")

    os.makedirs(PAGES_DIR, exist_ok=True)

    demo_imports: list[str] = []
    sections: list[str] = []

    for component in sorted(os.listdir(COMPONENTS_DIR)):
        component_dir = os.path.join(COMPONENTS_DIR, component)

        if not os.path.isdir(component_dir):
            continue

        demo_file = os.path.join(component_dir, f"{component}Demo.tsx")
        if not os.path.isfile(demo_file):
            continue

        demo_component_name = f"{component.capitalize()}Demo"
        demo_import_path = f"../components/{component}/{component}Demo"

        demo_imports.append(
            f'import {{ {demo_component_name} }} from "{demo_import_path}"'
        )

        sections.append(
            f"""
        <section className="border border-black p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 capitalize">
            {component}
          </h2>
          <{demo_component_name} />
        </section>
"""
        )

    page_code = f"""\
import React from "react"

{chr(10).join(demo_imports)}

export default function Home() {{
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Components</h1>

      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-8">
{''.join(sections)}
      </div>
    </main>
  )
}}
"""

    page_path = os.path.join(PAGES_DIR, "home.tsx")
    with open(page_path, "w", encoding="utf-8") as f:
        f.write(page_code)

    print("✅ Aggregated components page generated: home.tsx")


def main():
    aggregate_components()


if __name__ == "__main__":
    main()
