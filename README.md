# Portfolio site — how to use it

## What this is
A single static site — no build step, no framework, no server needed.
Three files matter:

- `index.html` — page structure (you shouldn't need to touch this often)
- `css/styles.css` — visual styling
- `js/projects-data.js` — **your project list**. This is the only file
  you'll normally edit.

## Adding a new project
Open `js/projects-data.js` and copy one of the existing objects, then
change every field. Full field guide is in the comment at the top of
that file. Save, and the new card appears on the site automatically —
nothing else needs to change.

## Things to fix before you publish
1. **LinkedIn link** — `index.html` has a placeholder `href="#"` on the
   LinkedIn button in the header. Swap in your real profile URL.
2. **Medium article matching** — I matched articles to projects based on
   title/content, but a couple were close calls (e.g. two of your recent
   posts both describe building a deployment tool — I assigned the
   "Miniature Heroku" one to SwiftDeploy; double check whether the second
   one, "Production-Grade Deployment Tool," belongs to a different
   project or is a part-two of the same one, and update the `medium`
   link in `projects-data.js` accordingly).
3. **GitHub repo links** — a few projects (SwiftDeploy, DDoS engine,
   Find, the microservices fix) point at your GitHub profile rather
   than a specific repo, because I couldn't confirm the exact repo name
   from the profile page alone. Swap in the direct repo URLs when you
   have a minute.
4. Add live LinkedIn post URLs per project if you want post-specific
   links rather than just your profile.

## Deploying it under your Namecheap domain
The simplest free path, since your code already lives on GitHub:

1. Create a new GitHub repo (e.g. `portfolio`) and push these files to
   it (`index.html` must be at the repo root).
2. In the repo, go to **Settings → Pages**, set the source to your main
   branch, root folder. GitHub will publish it at
   `https://<your-username>.github.io/portfolio`.
3. In the same **Settings → Pages** screen, enter your Namecheap domain
   under "Custom domain" and save. This creates a `CNAME` file in your
   repo automatically.
4. In Namecheap, go to **Domain List → Manage → Advanced DNS** and add:
   - If using the root domain (`yourdomain.com`): four `A` records
     pointing at GitHub's Pages IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
     `185.199.111.153`
   - If using a subdomain like `portfolio.yourdomain.com`: one `CNAME`
     record pointing at `<your-username>.github.io`
5. DNS changes can take up to a few hours to propagate. Once they do,
   tick "Enforce HTTPS" back in GitHub's Pages settings.

If you'd rather use Netlify or Vercel instead of GitHub Pages (both
also free, both support custom domains from Namecheap the same way —
just different DNS target values), the same three files work as-is;
just say the word and I'll write those steps instead.
