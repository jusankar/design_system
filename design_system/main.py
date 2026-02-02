import sys
import os
from crew import create_crew


def main():
    if len(sys.argv) < 2:
        print("Usage: python main.py <component> [component ...]")
        return

    for component in sys.argv[1:]:
        print(f"\n🚀 Processing component: {component}")

        crew = create_crew(component)
        result = crew.kickoff()

        component_code = None
        component_demo_code = None
        component_story_code = None
        component_test_code = None

        # ✅ Read CrewAI task outputs
        for task_output in result.tasks_output:
            if task_output.name == "fetch_component":
                component_code = task_output.raw
            elif task_output.name == "create_demo":
                component_demonstrator_code = task_output.raw
            elif task_output.name == "create_test":
                component_test_code = task_output.raw
            elif task_output.name == "create_story":
                component_story_code = task_output.raw

        if not component_code:
            raise RuntimeError("Component TSX code not generated")

        if not component_demonstrator_code or not component_story_code or not component_test_code:
            raise RuntimeError("Component or Story code not generated")

        # ----------------------
        # Define project roots
        # ----------------------
        BASE_DIR = os.path.dirname(__file__)
        MOON_ROOT = os.path.abspath(os.path.join(BASE_DIR, "..", "moon"))
        EARTH_ROOT = os.path.abspath(os.path.join(BASE_DIR, "..", "earth"))

        # ----------------------
        # Moon: Component + story
        # ----------------------
        moon_dir = os.path.join(MOON_ROOT, "src", "components", component)
        os.makedirs(moon_dir, exist_ok=True)

        component_path = os.path.join(moon_dir, f"{component}.tsx")
        story_path = os.path.join(moon_dir, f"{component}.story.tsx")
        test_path = os.path.join(moon_dir, f"{component}.test.tsx")
        index_path = os.path.join(moon_dir, "index.ts")

        with open(component_path, "w", encoding="utf-8") as f:
            f.write(component_code)

        with open(story_path, "w", encoding="utf-8") as f:
            f.write(component_story_code)

        with open(test_path, "w", encoding="utf-8") as f:
            f.write(component_test_code)

        with open(index_path, "w", encoding="utf-8") as f:
            f.write(f"export * from './{component}'\n")

        # ----------------------
        # Earth: Demo files
        # ----------------------
        earth_dir = os.path.join(EARTH_ROOT, "src", "components", component)
        os.makedirs(earth_dir, exist_ok=True)

        component_demonstrator_path = os.path.join(earth_dir, f"{component}Demo.tsx")
        with open(component_demonstrator_path, "w", encoding="utf-8") as f:
            f.write(component_demonstrator_code)

        # ----------------------
        # Print output paths
        # ----------------------
        print(f"✅ Written:")
        print(f"   - Component: {component_path}")
        print(f"   - story:   {story_path}")
        print(f"   - Demo:      {component_demonstrator_path}")
        print(f"   - Tests:     {test_path}")

        print(f"✅ Processed component: {component}")

if __name__ == "__main__":
    main()

