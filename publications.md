---
layout: page
title: Publications
permalink: /publications/
bibliography: references.bib
---

# Publications

<div id="publications-list">
  <!-- Publications will be auto-generated from references.bib -->
</div>

<script src="/assets/js/bibtex-parser.js"></script>
<script>
  // Load and parse BibTeX file
  fetch('/references.bib')
    .then(response => response.text())
    .then(bibtext => {
      const entries = parseBibTeX(bibtext);
      displayPublications(entries);
    });
</script>

---

**Total Citations**: 3,450+ (Google Scholar)  
**h-index**: 32  
**i10-index**: 58