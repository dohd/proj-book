import UrlPattern from 'url-pattern';

import RouteNameMap from './routeName';

/**
 * Loop through keys in RouteNameMap adding 
 * a static key-value for each matching dynamic-key
**/
const RouteNameKeySearch = pathName => {
    for (const key in RouteNameMap) {
        const pattern = new UrlPattern(key);
        const result = pattern.match(pathName);
        // add a key-value pair corresponding to
        // the static pathName matched
        if (result) RouteNameMap[pathName] = RouteNameMap[key];
    }
};

/**
* Convert dynamic path to its corresponding static path
**/
export default function RouteResolver(pathName) {
    RouteNameKeySearch(pathName);

    // split the pathname into components
    const snippets = pathName.split('/').filter(v => v);
    // add a foward slash to each component to form a url
    const snippetsUrls = snippets.map((v,i,a) => '/' + a.slice(0, i+1).join('/'));
    // define a regular expression to match urls ending with digits
    // e.g /home/proposals/20 or /home/proposals/objectives.../20
    const regex = new RegExp(/^(\/home)\/([\w\-/]*)\/(\d+)$/);
    // filter urls that do not match the regex
    const Urls = snippetsUrls.filter(v => !regex.test(v));
    
    // case page reloads, reconstruct static paths
    const mapKeys = Object.keys(RouteNameMap);
    Urls.forEach(v => !mapKeys.includes(v) && RouteNameKeySearch(v));

    return Urls;
}