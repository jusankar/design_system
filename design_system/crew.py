from crewai import Crew, Agent, Task
import yaml

from tools.shadcn_varient_scraper import shadcn_varient_scraper
from tools.shadcn_component_scraper import shadcn_component_scraper
from tools.scan_moon_components import scan_moon_components

import os

# ----------------------
# Helpers
# ----------------------

def load_yaml(path: str):
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


# ----------------------
# Crew Factory
# ----------------------

def create_crew(component: str) -> Crew:
    """
    Creates a CrewAI workflow to:
    1. Fetch ShadCN markdown using a tool
    2. Generate component demonstrator TSX
    3. Generate Storybook story
    4. Validate output
    """

    agents_cfg = load_yaml("config/agents.yaml")
    tasks_cfg = load_yaml("config/tasks.yaml")

    # ----------------------
    # Agents
    # ----------------------
    
    shadcn_component_scraper_agent = Agent(**agents_cfg["shadcn_component_scraper"], tools=[shadcn_component_scraper], max_iterations=1,)
    shadcn_varient_scraper_agent = Agent( **agents_cfg["shadcn_varient_scraper"],tools=[shadcn_varient_scraper], )
    component_demo_creator_agent = Agent(**agents_cfg["component_demo_creator"])
    component_story_creator_agent = Agent(**agents_cfg["component_story_creator"])
    component_test_creator_agent = Agent(**agents_cfg["component_test_creator"])
    validator_agent = Agent(**agents_cfg["validator"])
    aggregator_agent = Agent(**agents_cfg["component_aggregator"], tools=[scan_moon_components], max_iterations=1,)


    # ----------------------
    # Tasks
    # ----------------------

    fetch_component_task = Task(
        name="fetch_component",
        description=(
            "Scrape the ShadCN component TSX code for the component "
            f"named `{component}` from the Installation → Manual tab. "
            "Extract ONLY the first copy-paste code block."
        ),
        expected_output=tasks_cfg["fetch_component"]["expected_output"],
        agent=shadcn_component_scraper_agent,
        input={"component_name": component},
        output_key="component_code",
    )


    fetch_markdown_task = Task(
        name="fetch_markdown",
        description=(
            "Fetch the raw markdown for the ShadCN radix component "
            f"named '{component}'. "
            "You MUST use the shadcn_markdown_scraper tool. "
            "Do NOT invent or reuse previous content."
        ),
        expected_output=tasks_cfg["fetch_markdown"]["expected_output"],
        agent=shadcn_varient_scraper_agent,
        input={"component_name": component},
    )

    create_demo_task = Task(
        name="create_demo",
        description=tasks_cfg["create_demo"]["description"],
        expected_output=tasks_cfg["create_demo"]["expected_output"],
        agent=component_demo_creator_agent,
        context=[fetch_markdown_task],
        output_key="component_demo_code",  # ✅ REQUIRED
    )

    create_story_task = Task(
        name="create_story",
        description=tasks_cfg["create_story"]["description"],
        expected_output=tasks_cfg["create_story"]["expected_output"],
        agent=component_story_creator_agent,
        context=[fetch_markdown_task],
        output_key="story_code",  # ✅ REQUIRED
    )
    create_test_task = Task(
        name="create_test",
        description=tasks_cfg["create_test"]["description"],
        expected_output=tasks_cfg["create_test"]["expected_output"],
        agent=component_test_creator_agent,
        context=[fetch_markdown_task],
        output_key="test_code",  # ✅ REQUIRED
    )

    validate_task = Task(
        name="validate_output",
        description=tasks_cfg["validate_output"]["description"],
        expected_output=tasks_cfg["validate_output"]["expected_output"],
        agent=validator_agent,
        context=[create_demo_task, create_story_task],
    )

    aggregate_components_task = Task(
        name="generate_all_components_page",
        description=tasks_cfg["generate_all_components_page"]["description"],
        expected_output=tasks_cfg["generate_all_components_page"]["expected_output"],
        agent=aggregator_agent,
        output_key="all_components_page",
    )


    # ----------------------
    # Crew
    # ----------------------

    return Crew(
        agents=[
            shadcn_component_scraper_agent,
            shadcn_varient_scraper_agent,
            component_demo_creator_agent,
            component_story_creator_agent,
            component_test_creator_agent,
            validator_agent,
            aggregator_agent,
        ],
        tasks=[
            fetch_component_task,
            fetch_markdown_task,
            create_demo_task,
            create_story_task,
            create_test_task,
            validate_task,
            aggregate_components_task,
        ],
        process="sequential",
        verbose=True,
    )
