angular.module('blake').directive('navigationMenu', function() {
    function link(scope, element, attrs) {
        var category = function(item) {
            switch(item) {
                case "illbk":
                    return "illuminated_books";
                    break;
                case "comb":
                    return "book_illustration:designed_engraved";
                    break;
                case "comdes":
                    return "book_illustration:designed";
                    break;
                case "comeng":
                    return "book_illustration:engraved";
                    break;
                case "spb":
                    return "prints:designed_engraved";
                    break;
                case "spdes":
                    return "prints:designed";
                    break;
                case "speng":
                    return "prints:engraved";
                    break;
                case "cprint":
                    return "prints:drawings";
                    break;
                case "mono":
                    return "drawings_paintings:monochrome";
                    break;
                case "paint":
                    return "drawings_paintings:paintings";
                    break;
                case "pen":
                case "penink":
                    return "drawings_paintings:pen";
                    break;
                case "penc":
                    return "drawings_paintings:pencil";
                    break;
                case "wc":
                    return "drawings_paintings:wc";
                    break;
                case "ms":
                    return "manuscripts_typo:manuscripts";
                    break;
                case "ltr":
                    return "manuscripts_typo:letters";
                    break;
                case "te":
                    return "manuscripts_typo:typographic";
                    break;
                default:
                    return false;
            }
        };

        scope.organizeMenus = function(data) {
            if (!data) { return; }
            // Sort before nesting
            data.sort(function(a, b) { return a.composition_date - b.composition_date; });

            var menus = {
                illuminated_books: [],
                book_illustration: [{
                    designed_engraved: [],
                    designed: [],
                    engraved: []
                }],
                prints: [{
                    designed_engraved: [],
                    designed: [],
                    engraved: [],
                    drawings: []
                }],
                drawings_paintings: [{
                    pencil:[],
                    pen:[],
                    monochrome:[],
                    wc:[],
                    paintings: []
                }],
                manuscripts_typo: [{
                    manuscripts: [],
                    letters: [],
                    typographic: []
                }]
            };

            // Add to menu categories
            data.forEach(function(d) {
                var cat = category(d.medium),
                    pieces;

                if(cat) {
                    pieces = cat.split(/:/);

                    if(menus[pieces[0]] !== undefined || menus[pieces[0]][0][pieces[1]] !== undefined) {
                        if(pieces.length === 1) {
                            menus[pieces[0]].push(d);
                        } else {
                            menus[pieces[0]][0][pieces[1]].push(d);
                        }
                    }
                }
            });

            scope.menu_lists = menus;
        }

    }

    return {
        restrict: 'E',
        link: link,
        controller: "MenuController",
        templateUrl: '/blake/static/directives/menu/template.html'
    };
});

angular.module('blake').controller('MenuController', ['$scope', 'BlakeDataService', function($scope, BlakeDataService) {

    $('nav.navbar ul.navbar-nav > li.dropdown').click(function() {
      var viewport_width = $(window).width();
      var element_position = $(this).offset().left;

      $(this).find('ul.dropdown-menu').css({'width': viewport_width + 'px', 'left': '-' + element_position + 'px'});
    });

    BlakeDataService.getWorks().then(function (data) {
        $scope.organizeMenus(data);
    });
}]);