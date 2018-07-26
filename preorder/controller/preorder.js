app.controller('preorderCtrl', function($scope, $http, API_URL)
{
    $scope.dtCur          = new Date();
    $scope.dtWeekBefore   = new Date();
    $scope.cLoadedType    = 0;
    $scope.rgobjWine      = [];
    $scope.strColumn      = 'vintage';
    $scope.displayAttr    = 'block';

    $scope.dtWeekBefore.setDate($scope.dtWeekBefore.getDate() - 7);

    $http(
    {
        method: 'GET',
        url: API_URL + 'preorder-wines/creation/date'
    })
    .then(function(response)
    {
        $scope.dtTableCreation = new Date(response.data.date.create_time.replace(/-/g, '/'));
        $scope.fLinkEnabled    = ($scope.dtWeekBefore <= $scope.dtTableCreation);
    },
    function(error){});

    function loadPreorderWines(strType, intSort)
    {
        $http(
        {
            method: 'GET',
            url: API_URL + 'preorder-wines/' + strType
        })
        .then(function(response)
        {
            $scope.rgobjWine.push({
                sortOrder: intSort,
                type: strType,
                preorderWines: response.data.wines
            });

            $scope.cLoadedType += 1;
            if ($scope.cLoadedType == 11)
            {
                $scope.displayAttr = 'none';
            }
        },
        function(error){});
    }

    $scope.setSortOrder = function(strColumn)
    {
        $scope.strSortColumn = strColumn;
    };

    $scope.returnUrl    = '//anyway-grapes.jp/preorder/';
    $scope.intCurYear   = $scope.dtCur.getFullYear();

    loadPreorderWines('Bourgogne Rouge', 1);
    loadPreorderWines('Bourgogne Blanc', 2);
    loadPreorderWines('Bordeaux', 3);
    loadPreorderWines('Champagne', 4);
    loadPreorderWines('Old NV Champagne', 5);
    loadPreorderWines('Rhone', 6);
    loadPreorderWines('France Others', 7);
    loadPreorderWines('Piemonte', 8);
    loadPreorderWines('Brunello di Montalcino', 9);
    loadPreorderWines('Toscana', 10);
    loadPreorderWines('Italy Others', 11);
    loadPreorderWines('Others', 12);
});
