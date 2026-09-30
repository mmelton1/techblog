---
title: "Diagrams as code"
summary: "A diagram-as-code approach to my team's architecture diagrams, built with D2."
stack: ["D2"]
featured: true
publishDate: 2025-08-01
---

**Summary:** Architecture diagrams are one of the main ways my team explains an acquired company's environment to the people who will integrate it. For a long time, we drew every one of them by hand in Visio, which took a lot of time, and no two analysts' diagrams looked quite the same. Eventually, we moved to generating our diagrams from code, which made them more consistent and let us show more detail with less effort.

## Objectives:

1. Create architecture diagrams that are consistent, detailed, and faster to produce.

**Objective 1:** _Create architecture diagrams that are consistent, detailed, and faster to produce_

### Drawing diagrams by hand

Good diagrams are worth the effort, especially on complex acquisitions, where a clear picture of the environment can save everyone working the deal a lot of time. However, every diagram we made was drawn by hand in Visio, one shape and one line at a time. A detailed diagram took a long time to put together, and as we learned more about an environment, updating it meant moving things around by hand all over again. Each analyst also had their own way of laying things out, so diagrams varied from person to person.

### Moving to diagrams as code

We eventually decided to generate our diagrams from code. Before settling on a tool, I compared three of them: D2, Mermaid, and Structurizr (all of which turn a text description into a diagram). D2 generated the most readable diagrams for our use, and it was flexible enough to let us organize each diagram the way we wanted to present the information. The other two felt more opinionated about how a diagram should be laid out. With D2, instead of dragging shapes around, we write out the systems and connections, and the diagram is drawn from that.

### Results

Moving to code solved the problems we had with Visio. Since every diagram is built from the same kind of text file with the same styles, they come out consistent no matter who writes them. Adding detail means adding a few more lines rather than rearranging the whole drawing, so our diagrams now show more than they used to while taking less effort to make. When something changes, we update the text and the diagram is redrawn to match.
