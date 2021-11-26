const mix = require('laravel-mix');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.js('resources/js/app.js', 'public/js')
//     .postCss('resources/css/app.css', 'public/css', [
//         //
//     ]);

mix.webpackConfig(webpack => {
    return {
        plugins: [
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__: false,
                __VUE_PROD_DEVTOOLS__: false,
            }),
        ],
      // module: {
      //   rules: [
      //     {
      //       test: /\.css$/,
      //       loaders: [
      //         "style-loader",
      //         {
      //           loader: "css-loader",
      //           options: { modules: true, importLoaders: 1 }
      //         }
      //       ]
      //     }
      //   ]
      // }
    }
});

// mix.webpackConfig({
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         loaders: [
//           "style-loader",
//           {
//             loader: "css-loader",
//             options: { modules: true, importLoaders: 1 }
//           }
//         ]
//       }
//     ]
//   }
// });

mix.alias({
    '@': path.join(__dirname, 'resources/admin'),
    vue$: path.join(__dirname, 'node_modules/vue/dist/vue.esm-bundler.js')
});

mix.js('resources/admin/main.js', 'public/js').vue({version : 3}).sourceMaps();
