
export function Controller(controllerName: string): any {
    return function(clazz) {
        angular.module('TabsApp', []).controller(controllerName || clazz.name, clazz);
        return clazz;
    };
}
