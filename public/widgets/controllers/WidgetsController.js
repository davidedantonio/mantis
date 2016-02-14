app.controller('WidgetsController', function($scope, $routeParams, $rootScope,
  $location, $cookies, $http, $modal, $timeout, socket, $window, growl){
  var win = angular.element($window);

  $rootScope.dashboardId = $routeParams.dashboardId;
  $rootScope.widgets = [];
  $scope.chartConfig = [];
  $scope.dashboard = null;
  /*
   * Init Dashboard widget
   */
  $scope.init = function(){
    $rootScope.widgets = [];
    $scope.chartConfig = [];
    $scope.dashboard = null;

    $http.get('/widgets/'+$routeParams.dashboardId)
      .success(function(data, status, headers, config) {

        $scope.gridsterOptions.columns = data.dashboard.columns;
        $scope.dashboard = data.dashboard;

        data.widgets.forEach(function(value, key) {
          $rootScope.widgets.push({
            _id: value._id,
            sizeY: value.width,
            sizeX: value.height,
            col: value.columns,
            row: value.rows,
            name: value.name,
            frequency: value.frequency,
            url: value.url,
            data: (value.widget_data)?JSON.parse(value.widget_data):''
          });
        });
        updateGraphs();
    });
  };

  $scope.openDeleteWidget = function (size,id) {
    var the_id = id;
    var modalInstance = $modal.open({
      templateUrl:'modalDeleteWidget.html',
      controller: 'ModalDeleteWidget',
      size: size,
      resolve: {
        params: function(){
          return {
            title: 'Delete Widget',
            id: id
          };
        }
      }
    });

    modalInstance.result.then(function (result) {
      if (result){
        $rootScope.widgets.forEach(function(widget, key) {
          if (widget._id == result.id){
            $rootScope.widgets.splice(key,1);
            $scope.chartConfig.splice(widget._id,1);
          }
        });
      }
    });
  };

  $scope.openCreateWidget = function (size) {
    var modalInstance = $modal.open({
        templateUrl:'modalCreateWidget.html',
        controller: 'ModalWidgetsController',
        size: size,
        resolve: {
            params: function(){
              return {
                title: 'Create Widget',
                dashboardId: $rootScope.dashboardId
              };
            }
          }
      });

    modalInstance.result.then(function (result) {
      $rootScope.widgets.push({
        _id: result._id,
        name: result.name,
        url: result.url,
        frequency: result.frequency,
        sizeY: result.height,
        sizeX: result.width,
        col: result.columns,
        row: result.rows
      });
      $scope.chartConfig[result._id] = {};
      //TODO Error/Success Notification
    });
  };

  $scope.$on('socket:updatedWidgetGraph', function (ev, data) {
    var graphData = buildDataForChart(data);
    updateWidget(data._id, graphData);
  });

  $scope.$on('socket:insertWidget', function (ev, data) {
    $timeout(function(){
      if (data.dashboard === $rootScope.dashboardId) {
        var found = false;
        for (var i = 0; i < $rootScope.widgets.length; i++){
          if ($rootScope.widgets[i]._id == data._id)
            found = true;
        }

        if (!found){
          $rootScope.widgets.push(data);
          $scope.chartConfig[data._id] = {};
          growl.success("Widget " + data.name + " created!");
        }
      }
    },3000);
  });

  $scope.$on('socket:deleteWidget', function (ev, data) {
    var key = -1;
    var name = '';
    $timeout(function(){
      var found = false;
      for (var i = 0; i < $rootScope.widgets.length; i++){
        if ($rootScope.widgets[i]._id == data.id){
          name = $rootScope.widgets[i].name;
          found = true;
          key = i;
        }
      }

      if (found){
        $rootScope.widgets.splice(key,1);
        $scope.chartConfig.splice(data.id,1);
        growl.warning('Widget ' + name + ' deleted!');
      }
    },3000);
  });

  $scope.$on('socket:updatedWidget', function (ev, data) {
      $scope.$apply(function() {
        $rootScope.widgets.forEach(function(widget, key) {
          if (widget._id == data._id){
            if ((widget.sizeY != data.sizeY) ||
              (widget.sizeX != data.sizeX) ||
              (widget.col != data.col) ||
              (widget.row != data.row) ||
              (widget.frequency != data.frequency) ||
              (widget.url != data.url) || (widget.name != data.name)){
                $rootScope.widgets[key] = {
                    _id: data._id,
                    name: data.name,
                    url: data.url,
                    frequency: data.frequency,
                    sizeY: data.sizeY,
                    sizeX: data.sizeX,
                    col: data.col,
                    row: data.row,
                    data: data.widget_data
                  };
                  growl.info("Widget "+data.name+" updated!");
              }
          }
        });
      });
    });

  $scope.gridsterOptions = {
    margins: [5, 5],
    columns: 6,
    draggable: {
      handle: 'panel-heading',
      drag: function(event, $element, widget) {
        resizeChart($("#"+widget._id));
        reflow();
      },
      start: function(event, $element, widget) {
        resizeChart($("#"+widget._id));
        reflow();
      },
      stop: function(event, $element, widget) {
        resizeChart($("#"+widget._id));
        reflow();
        $http.post('/widgets/set-dashboard-widgets',{widgets:[widget]})
        .success(function(data, status, headers, config) { });
      }
    },
    resizable: {
      resize: function(event, $element, widget) {
        resizeChart($("#"+widget._id));
        reflow();
      },
      start: function(event, $element, widget) {
        resizeChart($("#"+widget._id));
        reflow();
      },
      stop: function(event, $element, widget) {
        resizeChart($("#"+widget._id));
        reflow();

        $http.post('/widgets/set-dashboard-widgets',{widgets:[widget]})
        .success(function(data, status, headers, config) {

        });
      }
    }
  };

  function reflow() {
    $scope.$broadcast('highchartsng.reflow');
  };

  win.bind('resize', function () {
    $rootScope.widgets.forEach(function(widget, key) {
      resizeChart($('#'+widget._id));
    });
  });

  function resizeChart($element){
    if (!$element.length)
      return false;

    $timeout(function(){
      var size = {
        width: parseInt($element.width()),
        height: parseInt($element.height())
      };
      if ($scope.chartConfig[$element.attr("id")])
        $scope.chartConfig[$element.attr("id")].size = size;
    },200);
  };

  function updateGraphs(){
    $rootScope.widgets.forEach(function(value, key) {
      $scope.chartConfig[value._id] = buildDataForChart(value.data);
    });
  };

  function updateWidget (id, data){
    $rootScope.widgets.forEach(function(value, key) {
      if (value._id == id){
        data._id = id;
        $rootScope.widgets[key].data = data;
        updateGraphs();
      }
    });
  };

  function buildDataForChart(result){
    if (!result)
      return {};

    var data = {};
    data.series = result.series;

    if (result.options){
      data.options = result.options;
      data.options.chart.renderTo = '#'+result._id;
    };

    if (result.plotOption)
      data.plotOption = result.plotOption;

    if (result.pane)
      data.pane = result.pane;

    if (result.tooltip)
      data.tooltip = result.tooltip;

    if (result.yAxis)
      data.yAxis = result.yAxis;

    data.title = {
          text: ''
    };

    data.xAxis = result.xAxis;
    data.loading = false;

    data.func = function (chart) {
        $timeout(function(){
          resizeChart($(data.options.chart.renderTo));
          chart.reflow();
        },200);
      };
    return data;
  };


});
