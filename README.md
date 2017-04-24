# I18N modules

Isolated I18N modules for your components. Like CSS modules but for i18n ;)

```
npm install --save i18n-modules
```

## Benefits

* No more large files with translations for the whole website.
* No more global scope.
* No more broken texts.

## Getting Started

### Client

The steps below use webpack to organize building process. You are free to use anything else.

#### Step 1:

First of all you should set available locales with the global variable `LANGS` and a locale for the current bundle with `BUNDLE_LANG`:

```js
    plugins: [
        new webpack.DefinePlugin({
            LANGS: JSON.stringify(['en', 'ru']),
            BUNDLE_LANG: JSON.stringify(bundleLang)
        })
    ]
```

#### Step 2:

Set an ignore pattern for unnecessary languages in the current bundle:

```js
    plugins: [
        new webpack.IgnorePlugin(new RegExp(`^\.\/(?!${bundleLang}$)`), /i18n$/),
        new webpack.DefinePlugin({
            LANGS: JSON.stringify(['en', 'ru']),
            BUNDLE_LANG: JSON.stringify(bundleLang)
        })
    ]
```

#### Step 3:

Create a folder with translations for your component:

```js
// src/components/MyComponent/i18n/en.js

module.exports = {
    'hello_world': 'Hello, world!'
};
```

```js
// src/components/MyComponent/i18n/ru.js

module.exports = {
    'hello_world': 'Привет, мир!'
};
```

```js
// src/components/MyComponent/i18n/index.js
// Include translations

module.exports = require('i18n-modules').include(lang => require(`./${lang}`));
```

#### Step 4:

Use translations from your component:

```js
// src/components/MyComponent/index.js

const t = require('./i18n');

class MyComponent extends Component {
    render() {
        return <h1>{t('hello_world')}</h1>
    }
}
```

### Node

If you want to use i18n modules with node.js, for example, to render react components, you should set a locale for the request before call translation functions.

```js
I18N.setLang(req.lang);
res.status(200).send(...rendering...);
```

If your project renders client code, don't set `BUNDLE_LANG` and include all translations into the server bundle.

```js
plugins: [
    new webpack.DefinePlugin({
        LANGS: JSON.stringify(['en', 'ru'])
    })
]
```

### Examples

See `example` folder. Clone repo and run `npm i && npm start`.

### Other

Supports interpolation, pluralization. Has [Polyglot.js](https://www.npmjs.com/package/node-polyglot) under the hood.
