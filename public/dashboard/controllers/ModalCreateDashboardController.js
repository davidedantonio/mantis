app.controller('ModalCreateDashboardController', function ($scope, $modalInstance, $http, params) {
  $scope.icon = "";
  $scope.label = "SELECT AN ICON";

  $scope.icons = [
    "fa fa-adjust",
    "fa fa-asterisk",
    "fa fa-bar-chart",
    "fa fa-barcode",
    "fa fa-beer",
    "fa fa-bell",
    "fa fa-bolt",
    "fa fa-book",
    "fa fa-bookmark",
    "fa fa-briefcase",
    "fa fa-bullhorn",
    "fa fa-calendar",
    "fa fa-camera",
    "fa fa-camera-retro",
    "fa fa-certificate",
    "fa fa-check",
    "fa fa-cloud",
    "fa fa-cloud-download",
    "fa fa-cloud-upload",
    "fa fa-coffee",
    "fa fa-cog",
    "fa fa-cogs",
    "fa fa-comment",
    "fa fa-comments",
    "fa fa-credit-card",
    "fa fa-dashboard",
    "fa fa-desktop",
    "fa fa-download",
    "fa fa-edit",
    "fa fa-envelope",
    "fa fa-exchange",
    "fa fa-exclamation-sign",
    "fa fa-external-link",
    "fa fa-fighter-jet",
    "fa fa-film",
    "fa fa-filter",
    "fa fa-fire",
    "fa fa-flag",
    "fa fa-folder-open",
    "fa fa-gift",
    "fa fa-glass",
    "fa fa-globe",
    "fa fa-group",
    "fa fa-headphones",
    "fa fa-heart",
    "fa fa-home",
    "fa fa-inbox",
    "fa fa-key",
    "fa fa-leaf",
    "fa fa-laptop",
    "fa fa-legal",
    "fa fa-lock",
    "fa fa-unlock",
    "fa fa-magic",
    "fa fa-magnet",
    "fa fa-map-marker",
    "fa fa-minus",
    "fa fa-mobile-phone",
    "fa fa-money",
    "fa fa-music",
    "fa fa-pencil",
    "fa fa-plane",
    "fa fa-plus",
    "fa fa-print",
    "fa fa-qrcode",
    "fa fa-quote-left",
    "fa fa-quote-right",
    "fa fa-random",
    "fa fa-refresh",
    "fa fa-remove",
    "fa fa-reorder",
    "fa fa-reply",
    "fa fa-retweet",
    "fa fa-road",
    "fa fa-rss",
    "fa fa-search",
    "fa fa-share",
    "fa fa-shopping-cart",
    "fa fa-signal",
    "fa fa-sitemap",
    "fa fa-sort",
    "fa fa-sort-down",
    "fa fa-sort-up",
    "fa fa-spinner",
    "fa fa-star",
    "fa fa-star-half",
    "fa fa-tablet",
    "fa fa-tag",
    "fa fa-tags",
    "fa fa-tasks",
    "fa fa-thumbs-down",
    "fa fa-thumbs-up",
    "fa fa-tint",
    "fa fa-trash",
    "fa fa-trophy",
    "fa fa-truck",
    "fa fa-umbrella",
    "fa fa-upload",
    "fa fa-user",
    "fa fa-volume-off",
    "fa fa-volume-down",
    "fa fa-volume-up",
    "fa fa-wrench",
    "fa fa-file",
    "fa fa-cut",
    "fa fa-copy",
    "fa fa-paste",
    "fa fa-save",
    "fa fa-undo",
    "fa fa-repeat",
    "fa fa-text-height",
    "fa fa-text-width",
    "fa fa-align-left",
    "fa fa-align-center",
    "fa fa-align-right",
    "fa fa-align-justify",
    "fa fa-font",
    "fa fa-bold",
    "fa fa-italic",
    "fa fa-strikethrough",
    "fa fa-underline",
    "fa fa-link",
    "fa fa-columns",
    "fa fa-table",
    "fa fa-th-large",
    "fa fa-th",
    "fa fa-th-list",
    "fa fa-list",
    "fa fa-list-ol",
    "fa fa-list-ul",
    "fa fa-angle-left",
    "fa fa-angle-right",
    "fa fa-angle-up",
    "fa fa-angle-down",
    "fa fa-arrow-down",
    "fa fa-arrow-left",
    "fa fa-arrow-right",
    "fa fa-arrow-up",
    "fa fa-caret-down",
    "fa fa-caret-left",
    "fa fa-caret-right",
    "fa fa-caret-up",
    "fa fa-chevron-down",
    "fa fa-chevron-left",
    "fa fa-chevron-right",
    "fa fa-chevron-up",
    "fa fa-circle",
    "fa fa-play-circle",
    "fa fa-play",
    "fa fa-pause",
    "fa fa-stop",
    "fa fa-step-backward",
    "fa fa-fast-backward",
    "fa fa-backward",
    "fa fa-forward",
    "fa fa-fast-forward",
    "fa fa-step-forward",
    "fa fa-eject",
    "fa fa-phone",
    "fa fa-facebook",
    "fa fa-twitter",
    "fa fa-github",
    "fa fa-linkedin",
    "fa fa-pinterest",
    "fa fa-google-plus",
    "fa fa-ambulance",
    "fa fa-medkit",
    "fa fa-stethoscope",
    "fa fa-user-md"
  ];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) { };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.setIcon = function (icon,$event) {
    $scope.icon = icon;
    $scope.label = icon;
  };

  $scope.title = params.title;
  $scope.dashboard_name = '';
  $scope.dashboard_description = '';
  $scope.columns = 6;
  $scope.dashboardFound = 0;
  $scope.submitted = false;

  $scope.interacted = function(field) {
    return $scope.submitted;
  };

  $scope.ok = function (event) {
    $scope.submitted = true;
    if(!$scope.dashboardCreateForm.dashboardName.$valid){
      event.stopPropagation();
      return;
    }

    var message = '';
    if (!$scope.columns)
      $scope.columns = 6;

    $http.post('/dashboard/create',{
        name: $scope.dashboardName,
        columns: $scope.columns,
        description: $scope.dashboardDescription,
        icon: $scope.icon
      }).success(function(data, status, headers, config) {
        $modalInstance.close('insert-ok');
      });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

app.controller("DropdownIcons", function($scope,$http){ });
