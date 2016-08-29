var BASE_URL = "https://pvideo-zmarkz.c9users.io";
var FRONT_BASE_URL = "http://localhost:3000/#/";

export class VideoController{
	constructor ($http, $location) {
    'ngInject';
    this.$http = $http;
    console.log($location.search().id);
    var id = $location.search().id;
    this.getVideo(id);
  }

  getVideo(id){
  	var vm = this;
  	this.$http.get(BASE_URL+'/api/video/id?id='+id).then(function(result){
  		//vm.iframeHTML = result.data.iframe;
  		console.log(result.data.iframe);
  		console.log(angular.element(document.querySelector("#iframe"))[0]);
  		angular.element(document.querySelector("#iframe"))[0].innerHTML = result.data.iframe;
  	});
  }

}