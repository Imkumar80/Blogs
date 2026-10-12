# Kumar's Portfolio & Blog

A personal portfolio and weekly blog for GitHub Pages. The homepage features AI projects, a KannadaSLM work-in-progress showcase, Kumar's profile, and searchable writing.

## Add a weekly post

1. Copy `posts/template.html` and save the copy with a new filename, such as `posts/week-3.html`.
2. Replace the title, summary, category, week number, date, tags, and sample article text in the copied file.
3. Add an entry at the end of `posts/posts.json` (remember the comma after the previous entry):

   ```json
   {
     "title": "Your post title",
     "excerpt": "A short summary shown on the homepage.",
     "date": "2026-10-27",
     "category": "Engineering",
     "tags": ["learning", "projects"],
     "url": "posts/week-3.html"
   }
   ```

4. Add the same category and tags to your article page, then commit and push. The homepage sorts posts newest-first and updates its search and category filters automatically.

Use dates in `YYYY-MM-DD` format. Keep each post URL relative to the repository root as shown above.

## Publish on GitHub Pages

1. Push this repository to GitHub.
2. In the repository, open **Settings → Pages** and select **GitHub Actions** as the source.
3. The workflow in `.github/workflows/deploy-pages.yml` publishes on pushes to `main` or `master`.

The repository's Pages URL is `https://imkumar80.github.io/Blogs/`.

## Preview locally

The homepage loads its post index with `fetch`, so serve the files over HTTP instead of opening `index.html` directly. From the repository root, run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Files

- `index.html` and `styles.css` — portfolio homepage and responsive theme
- `app.js` — homepage search, category filtering, and post rendering
- `assets/kumar-profile.png` — profile photo displayed in the About section
- `posts/posts.json` — homepage index of post titles, dates, categories, tags, and links
- `posts/template.html` — copy this to start a new article
- `posts/` — individual weekly articles
## Social profiles

The footer links to Kumar's [GitHub](https://github.com/Imkumar80), [Hugging Face](https://huggingface.co/kumar2235), [X](https://x.com/KumarShet192579), and [LinkedIn](https://www.linkedin.com/in/kumar-r-shet-4712552a1/) profiles.
