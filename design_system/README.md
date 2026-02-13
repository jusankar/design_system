# Design System Workspace

This workspace contains the **automation and orchestration layer** for building and maintaining a scalable Design System based on **ShadCN UI**.

It uses **CrewAI**, **Playwright**, and **Python** to scrape official ShadCN documentation and generate **deterministic, production-ready UI artifacts** inside the `moon` UI package.

---

## 📌 Scope & Responsibility

This workspace is responsible for:

- Scraping ShadCN documentation (Markdown source of truth)
- Extracting component, demo, story, and test code
- Validating correctness and consistency
- Writing output files into the **Moon Design System**
- Enforcing strict non-hallucination rules

This workspace **does NOT**:
- Run Storybook
- Contain UI runtime code
- Modify generated JSX
- Invent examples or APIs

---

## 🧠 Architecture Overview
```
CLI Input (Component Name)
↓
Crew (Orchestrator)
↓
Agents + Tasks
↓
ShadCN Docs (Markdown)
↓
Validated Output
↓
moon/src/components/<Component>/
```

---

## 🛠 Technology Stack

### Core
- **Python 3.11+**
- **CrewAI** – multi-agent orchestration
- **Playwright** – web scraping
- **PyYAML** – configuration loading

### Source of Truth
- ShadCN official documentation
- “View as Markdown” pages only

---

## 🧩 Directory Structure
```
design_system/
├── main.py
├── crew.py
├── tools/
│   └── shadcn_component_scraper.py
├── config/
│   ├── agents.yaml
│   └── tasks.yaml
├── utils/
│   └── file_writer.py
└── README.md
```


---

## Agents

Agents are defined in `config/agents.yaml`.  
Each agent has a single responsibility and does not invent content.

### Agents Overview

- **ShadCN Markdown Scraper**  
  Fetches raw markdown from ShadCN documentation.

- **ShadCN Component Code Scraper**  
  Extracts the main component TSX code using the exact component name provided.

- **Component Demonstrator Creator**  
  Extracts demo/example components from markdown.

- **Component Story Creator**  
  Converts examples into Storybook TSX stories.

- **Component Test Creator**  
  Generates unit tests using Vitest and Testing Library.

- **Validator**  
  Verifies correctness, completeness, and ensures no hallucinated content.

---

## Tasks

Tasks are defined in `config/tasks.yaml`.

Each task:
- Is assigned to one agent
- Uses only provided context
- Runs in a fixed order

### Task Flow

1. Fetch ShadCN markdown
2. Extract component code
3. Extract demo code
4. Generate Storybook stories
5. Generate unit tests
6. Validate output

---

## Crew

The crew is defined in `crew.py`.

Responsibilities:
- Load agents from `agents.yaml`
- Load tasks from `tasks.yaml`
- Execute tasks in sequence
- Stop execution if validation fails

---

## main.py

`main.py` is the entry point.

Responsibilities:
- Accept component name from CLI
- Create and run the crew
- Trigger file generation

Install:
```bash
python -3.11 -m venv .venv  
.\.venv\Scripts\Activate

python -m pip install --upgrade pip setuptools wheel
pip install crewai
pip install playwright
python -m playwright install
```

Usage:
```bash
python main.py alert

