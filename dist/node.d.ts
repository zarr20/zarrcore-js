interface RouteItem {
    file: string;
    path?: string;
}

interface RouterWriter {
    write(routes: RouteItem[], options: {
        outputDir: string;
        fileName: string;
        importBase: string;
        pagesDir?: string;
    }): void;
}

declare function routerMapper(config: {
    pages: {
        dir: string;
        extensions?: string[];
    };
    output: {
        dir: string;
        fileName?: string;
    };
    writer: RouterWriter;
    importBase?: string;
}): void;

declare function reactRouterWriter(): RouterWriter;

export { type RouteItem, type RouterWriter, reactRouterWriter, routerMapper };
