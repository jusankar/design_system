import sys
import os
from crew import create_crew
from tools.aggregate_components import aggregate_components



def update_moon_root_index(moon_root: str, component: str):
    index_path = os.path.join(moon_root, "src", "index.ts")

    css_import = "import '@/styles/index.css'\n"
    export_line = f"export * from '@/components/{component}'\n"

    lines: list[str] = []

    if os.path.exists(index_path):
        with open(index_path, "r", encoding="utf-8") as f:
            lines = f.readlines()

    # Ensure CSS import exists only once
    if css_import not in lines:
        lines.insert(0, css_import)

    # Ensure component export exists
    if export_line not in lines:
        lines.append(export_line)

    with open(index_path, "w", encoding="utf-8") as f:
        f.writelines(lines)


def main():
    if len(sys.argv) < 2:
        print("Usage: python main.py <component> [component ...]")
        return

    BASE_DIR = os.path.dirname(__file__)
    MOON_ROOT = os.path.abspath(os.path.join(BASE_DIR, "..", "moon"))
    EARTH_ROOT = os.path.abspath(os.path.join(BASE_DIR, "..", "earth"))

    # --------------------------------
    # PROCESS EACH COMPONENT
    # --------------------------------
    for component in sys.argv[1:]:
        print(f"\n🚀 Processing component: {component}")

        crew = create_crew(component)
        result = crew.kickoff()

        component_code = None
        component_demo_code = None
        component_story_code = None
        component_test_code = None

        for task_output in result.tasks_output:
            if task_output.name == "fetch_component":
                component_code = task_output.raw
            elif task_output.name == "create_demo":
                component_demo_code = task_output.raw
            elif task_output.name == "create_story":
                component_story_code = task_output.raw
            elif task_output.name == "create_test":
                component_test_code = task_output.raw

        if not component_code:
            raise RuntimeError(f"{component}: Component TSX not generated")

        if not component_demo_code:
            raise RuntimeError(f"{component}: Demo not generated")

        if not component_story_code:
            raise RuntimeError(f"{component}: Story not generated")

        if not component_test_code:
            raise RuntimeError(f"{component}: Test not generated")

        # ----------------------
        # Moon output
        # ----------------------
        moon_dir = os.path.join(MOON_ROOT, "src", "components", component)
        os.makedirs(moon_dir, exist_ok=True)

        with open(os.path.join(moon_dir, f"{component}.tsx"), "w", encoding="utf-8") as f:
            f.write(component_code)

        with open(os.path.join(moon_dir, f"{component}.story.tsx"), "w", encoding="utf-8") as f:
            f.write(component_story_code)

        with open(os.path.join(moon_dir, f"{component}.test.tsx"), "w", encoding="utf-8") as f:
            f.write(component_test_code)

        with open(os.path.join(moon_dir, "index.ts"), "w", encoding="utf-8") as f:
            f.write(f"export * from './{component}'\n")

        update_moon_root_index(MOON_ROOT, component)

        # ----------------------
        # Earth demo output
        # ----------------------
        earth_component_dir = os.path.join(EARTH_ROOT, "src", "components", component)
        os.makedirs(earth_component_dir, exist_ok=True)

        with open(os.path.join(earth_component_dir, f"{component}Demo.tsx"),"w", encoding="utf-8") as f:
            f.write(component_demo_code)

        print(f"✅ Processed component: {component}")

    # --------------------------------
    # AGGREGATE ALL COMPONENTS (PURE PYTHON)
    # --------------------------------
    print("\n🧩 Generating consolidated components page")
    aggregate_components()
    print("✅ Updated consolidated page: home.tsx")


if __name__ == "__main__":
    main()
