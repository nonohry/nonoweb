---
layout: page
title: Blog
permalink: /blog/
---

# Blog

<div class="blog-list">
  {% for post in site.posts %}
    <article class="blog-post" style="margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid #e5e7eb;">
      <h2 style="margin-bottom: 0.5rem;">
        <a href="{{ post.url }}" style="color: #2563eb; text-decoration: none;">{{ post.title }}</a>
      </h2>
      <p style="color: #64748b; font-size: 0.875rem; margin-bottom: 1rem;">
        📅 {{ post.date | date: "%B %d, %Y" }}
        {% if post.categories %}
          &nbsp;|&nbsp; 🏷️ {{ post.categories | join: ", " }}
        {% endif %}
      </p>
      <p style="line-height: 1.6;">{{ post.excerpt }}</p>
      <a href="{{ post.url }}" style="color: #2563eb; font-weight: 600; text-decoration: none;">Read more →</a>
    </article>
  {% endfor %}
</div>

{% if site.posts.size == 0 %}
<div style="background: #f3f4f6; padding: 2rem; border-radius: 0.5rem; text-align: center;">
  <p>📝 No blog posts yet. Add your first post in the <code>_posts</code> folder!</p>
</div>
{% endif %}