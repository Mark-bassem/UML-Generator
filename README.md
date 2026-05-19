# Diagram Studio

Diagram Studio is a lightweight, client-side web app that helps you generate and preview **Mermaid diagrams**. It supports:

- **Use Case Diagrams**
- **Class Diagrams**
- **System Sequence Diagrams**

You can render diagrams instantly and download them as **SVG** or **PNG**.

---

## Features

- Diagram type selector (Use Case / Class / System Sequence)
- Built-in starter templates for each diagram type
- Live render using Mermaid
- Download output:
  - **Download SVG**
  - **Download PNG** (rendered from the SVG)

---

## Tech Stack

- **HTML / CSS / JavaScript** (static frontend)
- **Mermaid** (loaded via CDN)

Mermaid is included from:

- `https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js`

---

## How to Use

### 1) Open the app

Simply open `index.html` in your browser.

> Tip: No build step is required.

### 2) Choose a diagram type

Use the **Select Diagram Type** dropdown:

- **Use Case Diagram**
- **Class Diagram**
- **System Sequence Diagram**

Selecting a type automatically loads a template into the editor.

### 3) Edit your Mermaid code

In the text area, paste or write Mermaid syntax. Then click **Render Diagram**.

### 4) View and download

The generated diagram appears in the **Diagram Preview** panel.

- Click **Download SVG** to save the SVG.
- Click **Download PNG** to export a PNG image.

---

## Mermaid Syntax Notes

- The editor expects **Mermaid diagram code**.
- If the code is empty, the preview shows a “No content” message.
- If Mermaid cannot parse your input, an error message is shown in the preview.

---

## Project Structure

- `index.html`
  - Page layout: editor, diagram preview, and download buttons
- `script.js`
  - Mermaid initialization
  - Diagram templates
  - Render logic
  - SVG/PNG download handling
- `style.css`
  - Styling (glass cards, layout, colors)

---

## License

(Add your license here. If you don’t have one, you can remove this section.)

