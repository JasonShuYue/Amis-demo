const DB = require('./sample.db');

module.exports = function(req, res) {

    const pathname = (req.originalUrl || req.url).replace(/^\/(api\/mock2|api)\/|\?.*$/g, '');

    return index(req, res)

}

function index(req, res) {
    const perPage = 10;
    const page = req.query.page || 1;
    let items = DB.concat();


    // 根据 关键字|| 类型 || 日期 查找item
    if (req.query.keywords || req.query.free) {
        const keywords = req.query.keywords;
        const free = req.query.free;
        items = items.filter(function(item) {
            return ~JSON.stringify(item).indexOf(keywords);
        });
    }


    // 根据「orderBy」来排序item
    if (req.query.orderBy) {
        const field = req.query.orderBy;
        const direction = req.query.orderDir === 'desc' ? -1 : 1;
        items = items.sort(function (a, b) {
            a = String(a[field]);
            b = String(b[field]);

            if (/^\d+$/.test(a) && /^\d+$/.test(b)) {
                a = parseInt(a, 10);
                b = parseInt(b, 10);
                return (a > b ? 1 : a < b ? -1 : 0) * direction;
            }

            return a.localeCompare(b) * direction;
        });
    }

    items = items.map((item, index) => {
        return Object.assign({}, item, {
            "num": index + 1
        })
    });


    const ret = {
        status: 0,
        msg: 'ok',
        data: {
            count: items.length,
            rows: items.concat().splice((page -1) * perPage, perPage)
        }
    };

    res.json(ret);
}