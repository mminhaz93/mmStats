<div align="center">
  <img width="200" height="200"
    src="https://raw.githubusercontent.com/Gherciu/moStats/master/static/logo.png">
  <h1>MmStats</h1>
  <p> 🗃⚛️A GatsbyJs starter that includes the most popular js libraries, already pre-configured and ready for use. <a href="https://mmstats.netlify.com/" alt="moStats">DEMO</a>.</p>
</div>

[![Netlify Status](https://api.netlify.com/api/v1/badges/b654c94e-08a6-4b79-b443-7837581b1d8d/deploy-status)](https://app.netlify.com/sites/moStats/deploys)
[![GitHub](https://img.shields.io/github/license/Gherciu/moStats)](https://github.com/mminhaz93/moStats/blob/master/LICENSE.md)
[![moStats](https://img.shields.io/badge/Generated%20from-gatsby--all--in-green)](https://github.com/mminhaz93/moStats)

### Getting started

- Create a new Gatsby site using the moStats starter: `gatsby new blog https://github.com/mminhaz93/moStats`
- Edit configuration variables in `.env.development` file
- Start dev server: `npm run start`

### Features

- `ESLint` and `Stylelint` to enforce code style. Run `npm run lint:scripts` for `.js|.jsx` and `npm run lint:styles` for `.css|.scss` files.
- Pre-commit hooks with `husky` and `lint-staged`
- Useful SCSS helpers `_mixins` and `_vars` see all in `./src/styles`
- `redux` and `redux-devtools` implimented and configured to work well in `development` mode and `production`. The store is hot reloadable ;)
- Aliases for all folders (components, styles, store etc.) see all available aliases in `./gatsby-config.js`
- `antd` is added and configured to work well as an UI framework (css normalization is not need, antd has own)
- All folders in `./src` have own README.md file with a little documentation and usage guide
- `Helmet` implimented and configured with `gatsby-plugin-react-helmet` see an example in `./src/layouts/MainLayout.js`
- Configured `tailwindcss` a utility-first CSS framework for rapidly building custom designs.

### When ready to build for production

- Create file `.env.production` the content should be the same as in `.env.development`
- Build the project: `npm run build`
- Start production server: `npm run serve`

---

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**[@mminhaz93/moStats](https://github.com/mminhaz93/moStats)** © [MMINHAZ](https://github.com/mminhaz93), Released under the [MIT](https://github.com/mminhaz93/moStats/blob/master/LICENSE.md) License.<br>
Authored and maintained by GHERCIU with help from contributors ([list](https://github.com/mminhaz93/moStats/contributors)).

#### If you like this repository star⭐ and watch👀 on [GitHub](https://github.com/mminhaz93/moStats)

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/mminhaz93/moStats)
