/**
 * Created with JetBrains WebStorm.
 * User: Eddie
 * Date: 10/5/13
 * Time: 3:12 PM
 * To change this template use File | Settings | File Templates.
 */


/*function Cntl2($scope) {
    var exprs = $scope.exprs = [];
    $scope.expr = '3*10|currency';
    $scope.addExp = function(expr) {
        exprs.push(expr);
    };

    $scope.removeExp = function(index) {
        exprs.splice(index, 1);
    };
}*/


// Define a new module. This time we declare a dependency on
// the ngResource module, so we can work with the Instagram API

// Create and register the new "instagram" service
switchGridApp.factory('instagram', function($resource){

    return {
        fetchPopular: function(callback){

            // The ngResource module gives us the $resource service. It makes working with
            // AJAX easy. Here I am using the client_id of a test app. Replace it with yours.

            var api = $resource('https://api.instagram.com/v1/media/popular?client_id=:client_id&callback=JSON_CALLBACK',{
                client_id: '642176ece1e7445e99244cec26f4de1f'
            },{
                // This creates an action which we've chosen to name "fetch". It issues
                // an JSONP request to the URL of the resource. JSONP requires that the
                // callback=JSON_CALLBACK part is added to the URL.

                grab:{method:'JSONP'}
            });

            api.grab(function(response){

                // Call the supplied callback function
                callback(response.data);

            });
        }
    }

});

// The controller. Notice that I've included our instagram service which we
// defined below. It will be available inside the function automatically.

function SwitchableGridController($scope, instagram){

    // Default layout of the app. Clicking the buttons in the toolbar
    // changes this value.

    $scope.layout = 'grid';

    $scope.pics = [];

    // Use the instagram service and fetch a list of the popular pics
    instagram.fetchPopular(function(data){

        // Assigning the pics array will cause the view
        // to be automatically redrawn by Angular.
        $scope.pics = data;
    });

    $scope.getNew = function() {
        instagram.fetchPopular(function(data) {
           $scope.pics = data;
        });
    };

}