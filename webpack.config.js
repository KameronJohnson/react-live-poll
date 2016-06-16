//This file tells Webpack what files to use and create.
//Webpack is a tool that packages / compiles JS code so it can be served to the browser.
//Babel-loader is use to convert es6 and JSX code to JS that is readable by the browser.

module.exports = {
    //starting JS file for the client (client.js), which will then load APP component
    entry: "./client.js",
    
    //webpack creates bundle.js after preprocessing and packaging.
    output: {
        filename: "public/bundle.js"
    },
    module: {
        
        loaders: [
                {   //babel to convert es6 and JSX for the browser.
                    //exclude used with regex so babel doesn't run on everything.
                    test: /\.jsx?$/,
                    exclude: /(node_modules|server.js)/,
                    loader: 'babel',
                    query:
                      {
                        presets:['react']
                      }
                }
            ]
    }
};

//bundle.js is created by running $webpack in terminal