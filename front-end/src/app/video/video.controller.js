export class VideoController{
	constructor ($http) {
    'ngInject';
    this.$http = $http;
    this.getVideo();
  }

  getVideo(){
  	var vm = this;
  	this.$http.get('http://localhost:5000/api/video/id?id=57c3047ed644b6487142b5ff').then(function(result){
  		//vm.iframeHTML = result.data.iframe;
  		console.log(result.data.iframe);
  		console.log(angular.element(document.querySelector("#iframe"))[0]);
  		angular.element(document.querySelector("#iframe"))[0].innerHTML = result.data.iframe;
  	});
  }

}