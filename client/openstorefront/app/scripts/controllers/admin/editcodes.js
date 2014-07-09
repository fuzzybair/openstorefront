'use strict';

app.controller('AdminEditcodesCtrl', ['$scope','business',  function ($scope, Business) {
  // Here we are grabbing the different collection key's and name's to put in the 'editcodes' tool.
  $scope.filters = Business.getFilters();
  $scope.collectionContent = null;
  

  /***************************************************************
  * This function will grab a collection from a filter given the key
  * of the filter.
  ***************************************************************/
  $scope.grabCollection = function(key) {
    var filter = _.where($scope.filters, {'key': key})[0];
    $scope.collectionContent = filter.collection;
  };
  

  $scope.collection = [];
  _.each($scope.filters, function(filter) {
    // var label = 'Manage ' + filter.name + ' Codes';
    // var location = 'views/admin/editcodes.html';
    // var children = [];
    // _.each(filter.collection, function(code){
    //   children.push({'label':code.type, 'location':'views/admin/editcode.html'});
    // });
      //
    // attributes.children.push({'label':label, 'location': location, 'toolTitle': label, 'key': filter.key, 'parentKey': 'attributes', 'data': filter /*, 'children': children*/});
    $scope.collection.push({'name': filter.name, 'key': filter.key});
  });

  if ($scope.$parent.collectionSelection) {
    $scope.collectionSelection = _.where($scope.collection, {'key': $scope.collectionSelection.key})[0];
    $scope.grabCollection($scope.collectionSelection.key);
  }


  $scope.gridOptions = {
    data: 'collectionContent',
    enableCellSelection: true,
    enableRowSelection: true,
    enableCellEdit: true,
    multiSelect: true,
    // showGroupPanel: true,
    columnDefs: [
      //
      {field: 'type', displayName: 'Name', enableCellEdit: true},
      {field:'code', displayName:'Code', enableCellEdit: true},
      {field:'desc', displayName:'Description', enableCellEdit: true},
      {field:'longDesc', displayName:'Long Description', enableCellEdit: true},
      {field:'checked', displayName:'Start With Filter Applied', enableCellEdit: true, cellTemplate: '<input class="" type="checkbox" ng-checked="row.getProperty(col.field)" ng-model="COL_FIELD"/>'},
      {field:'landing', displayName:'Collection', cellTemplate: '<div class="ngCellText" ng-click="editLanding(row.getProperty(col.field))"><a>Edit Landing Page</a></div>', enableCellEdit: false, groupable: false, sortable: false}
    //
    ]
  };

  $scope.$watch("collectionContent", function() {
    // This is where we know something changed on the model for the collection that
    // The user was editing. (Useful for inline editing, possibly useful for modal editing as well.)
    // console.log('Checks', $scope.collectionContent[0].longDesc);
  }, true);

}]);