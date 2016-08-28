export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    }).state('video', {
      url: '/video/id',
      templateUrl: 'app/video/video.html',
      controller: 'VideoController',
      controllerAs: 'video'
    });

  $urlRouterProvider.otherwise('/');
}
