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
  	this.$http.get('http://localhost:5000/api/video/id?id='+id).then(function(result){
  		//vm.iframeHTML = result.data.iframe;
  		console.log(result.data.iframe);
  		console.log(angular.element(document.querySelector("#iframe"))[0]);
  		angular.element(document.querySelector("#iframe"))[0].innerHTML = result.data.iframe;
  	});
  }

}