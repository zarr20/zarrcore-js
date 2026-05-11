interface RouteItem {
    path: string;
    file: string;
}

interface RouterWriter {
    write(routes: RouteItem[], options: any): void;
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

export { type RouterWriter, reactRouterWriter, routerMapper };
