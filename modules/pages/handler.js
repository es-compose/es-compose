var path = require('path');
const DEFAULT_PAGE = 'index';

/**
 * Page controller routing
 */
module.exports = function(req, res, next) {
    let page = req.path;
    if(page == '/') {
        page = DEFAULT_PAGE;
    }

    let view = path.join('pages', page);

    try {
        res.render(view, {
            title: 'Pages'
        });
    } catch(e) {
        e.status = e.code = 404;
        next(e);
    }
};