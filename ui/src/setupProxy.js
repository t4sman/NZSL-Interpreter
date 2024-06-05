const { legacyCreateProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/predict',
        legacyCreateProxyMiddleware({
            target: 'http://localhost:4000',
            changeOrigin: true,
        })
    );
    app.use(
        '/chur',
        legacyCreateProxyMiddleware({
            target: 'http://localhost:4000',
            changeOrigin: true,
        })
    )

    app.use(
        '/numsigns',
        legacyCreateProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );

    app.use(
        '/search',
        legacyCreateProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );

    app.use(
        '/listtopics',
        legacyCreateProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );

    app.use(
        '/sign_profile',
        legacyCreateProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );
};