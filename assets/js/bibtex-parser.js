// Simple BibTeX parser for Jekyll publications page
function parseBibTeX(bibtext) {
  const entries = [];
  const entryRegex = /@(\w+)\{([^,]+),\s*([\s\S]*?)\n\}/g;
  
  let match;
  while ((match = entryRegex.exec(bibtext)) !== null) {
    const type = match[1];
    const key = match[2];
    const fields = match[3];
    
    const entry = { type, key };
    
    // Parse fields
    const fieldRegex = /(\w+)\s*=\s*\{([^}]+)\}|(\w+)\s*=\s*"([^"]+)"/g;
    let fieldMatch;
    while ((fieldMatch = fieldRegex.exec(fields)) !== null) {
      const fieldName = fieldMatch[1] || fieldMatch[3];
      const fieldValue = fieldMatch[2] || fieldMatch[4];
      entry[fieldName] = fieldValue;
    }
    
    entries.push(entry);
  }
  
  // Sort by year (descending)
  entries.sort((a, b) => (b.year || 0) - (a.year || 0));
  
  return entries;
}

function formatAuthors(authors) {
  if (!authors) return '';
  
  // Bold "Smith, Jane" or "Smith, J"
  authors = authors.replace(/Smith, Jane/g, 'Smith, J.');
  authors = authors.replace(/ and /g, ', ');
  
  return authors;
}

function displayPublications(entries) {
  const container = document.getElementById('publications-list');
  if (!container) return;
  
  // Group by year
  const byYear = {};
  entries.forEach(entry => {
    const year = entry.year || 'Unknown';
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push(entry);
  });
  
  // Sort years descending
  const years = Object.keys(byYear).sort((a, b) => b - a);
  
  let html = '';
  
  years.forEach(year => {
    html += `<h2>${year}</h2>\n`;
    
    byYear[year].forEach(entry => {
      html += '<div class="publication-entry" style="margin-bottom: 1.5rem;">\n';
      
      // Format based on type
      if (entry.type === 'article') {
        html += `<p>${formatAuthors(entry.author)} (${entry.year}). `;
        html += `<strong>${entry.title}</strong>. `;
        html += `<em>${entry.journal}</em>`;
        
        if (entry.volume) html += `, ${entry.volume}`;
        if (entry.number) html += `(${entry.number})`;
        if (entry.pages) html += `, ${entry.pages.replace('--', '–')}`;
        html += '.<br>\n';
        
        // Links
        if (entry.doi) html += `[<a href="https://doi.org/${entry.doi}">DOI</a>] `;
        if (entry.pdf) html += `[<a href="${entry.pdf}">PDF</a>] `;
        if (entry.url) html += `[<a href="${entry.url}">Link</a>]`;
        
        html += '</p>\n';
      } else if (entry.type === 'incollection') {
        html += `<p>${formatAuthors(entry.author)} (${entry.year}). `;
        html += `"${entry.title}". `;
        html += `In <em>${entry.booktitle}</em>`;
        if (entry.pages) html += ` (pp. ${entry.pages.replace('--', '–')})`;
        html += `. ${entry.publisher}.</p>\n`;
      }
      
      html += '</div>\n';
    });
  });
  
  container.innerHTML = html;
}