app.controller('itunesController', function($scope,$http,$filter) {
    $scope.allData = [];
    $scope.currentData = [];
    $scope.currentPage = 0;
    $scope.itunesSearchText = "";
    $scope.types = ["movie","music","musicVideo","all"];


    $scope.getItunesData = function(searchText, limitResultCount, type){
        $http.get('https://itunes.apple.com/search', {
            params: {
                term: searchText,
                limit: limitResultCount,
                media: type
                //pageToken: $scope.nextPage ? $scope.nextPage : '',
                //part: 'id,snippet',
                //fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle,nextPageToken,prevPageToken',
                //q: searchText
            }
        }).success( function (data) {
            if (data.results.length === 0) {
                $scope.currentData = 'No results were found!';
            }
            $scope.itunesSearchText = searchText;
            $scope.allData = data.results;
            $scope.currentPage = 0;
            $scope.currentData = $scope.allData.slice(0, 10);
        });
    };


    $scope.checkDataLength = function(data){
        return (data.length >=1);
    };

    $scope.callNextPage = function(nextPage){
        if (nextPage) {
            $scope.currentPage ++;
        }
        else {
            $scope.currentPage --;
        }
        $scope.currentData = $scope.allData.slice($scope.currentPage * 10, $scope.currentPage * 10 + 10);
    };
     $scope.hasNext = function(){
        return (($scope.currentPage + 1) * 10)  < $scope.allData.length;
     };
});