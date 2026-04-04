---
name: md2pdf
description: "Convert a markdown file to a styled PDF using pandoc and pdflatex. Use this skill when the user wants to generate a PDF from a markdown file, export markdown as PDF, or asks to create/update a CV or document PDF. Also triggers for requests like 'rebuild the CV PDF', 'convert md to pdf', or 'regenerate the PDF'."
---

# Markdown to PDF Converter

Converts a markdown file to a clean, styled PDF using pandoc with pdflatex.

## Usage

The skill accepts two arguments separated by a space:

```
/md2pdf <input.md> <output.pdf>
```

**Examples:**
- `/md2pdf /Users/jairam/workspace/personal/cv.md /Users/jairam/workspace/personal/jairamc.github.io/static/cv.pdf`
- `/md2pdf ./README.md ./README.pdf`

If no arguments are provided, default to:
- Input: `/Users/jairam/workspace/personal/cv.md`
- Output: `/Users/jairam/workspace/personal/jairamc.github.io/static/cv.pdf`

## How to execute

Run the following command via the Bash tool:

```bash
pandoc <input_path> -o <output_path> \
  --pdf-engine=pdflatex \
  -V geometry:margin=0.8in \
  -V fontsize=10pt \
  -V pagestyle=empty \
  -V linestretch=1.15
```

## Requirements

- `pandoc` must be installed (`brew install pandoc`)
- `pdflatex` must be on PATH (install via `brew install --cask basictex`, then restart terminal)

## After running

- Confirm the PDF was created and report its file size
- If the output path is inside a Hugo `static/` directory, mention that it will be served at the corresponding URL path (e.g., `static/cv.pdf` becomes `jairam.dev/cv.pdf`)
