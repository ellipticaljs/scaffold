import elliptical from '../references/elliptical';
import container from '../dependencies/container';
import keys from '../references/keys';
import {Progress, Morph, Label} from '../modules/ui';


var PAGE_SIZE = keys.GRID_SIZE;

var $Class$ = container.getType('$Class$');

export default class Controller extends elliptical.Controller {
    async List(req, res, next) {
        let label = "$ClassLabel$";
        let $ClassInstance$ = new $Class$();
        let page = req.params.id;
        let baseUrl = '/$Class$/List';
        let rawUrl = req.url;
        let pageSize = PAGE_SIZE;
        Progress.start();
        Morph.reset();
        try {
            label += Label.get(req.query);
            let result = await $ClassInstance$.paginate({baseUrl, rawUrl, page, pageSize})
                .filter(req.query)
                .orderBy(req.query.$orderBy)
                .orderByDesc(req.query.$orderByDesc)
                .getAsync();
            
            let enumerable = result.data;
            let pagination = result.pagination;
            let count = pagination.count;
            let context = {enumerable, pagination, count, label};
            res.render(context);
        } catch (err) {
            next(err);
        }
    }

    async Detail(req, res, next) {
        var id = req.params.id;
        Progress.start();
        Morph.toggle();
        try {
            let entity = await $Class$.getAsync({id});
            let context = {entity};
            res.render(context);
        } catch (err) {
            next(err);
        }
    }

    Create(req, res, next) {
        Morph.toggle();
        res.render();
    }
}

   
    
  
