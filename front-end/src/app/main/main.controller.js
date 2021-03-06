//var BASE_URL = "http://localhost:5000";
var BASE_URL = "https://pvideo-zmarkz.c9users.io";
var FRONT_BASE_URL = "http://localhost:3000/#/";

var IP = process.env.IP;
var PORT = process.env.PORT;

export class MainController {
  constructor ($http, $location) {
    'ngInject';
    this.$http = $http;
    var params = $location.search();
    this.getVideos(params);
  }

  getSearch(){
  	var vm = this;
  	console.log(this.searchText);
  	this.$http.get(BASE_URL+ '/api/videos/search?tag='+this.searchText).then(function(result){
  		vm.videos = result.data;
  		vm.videos = vm.videos.map((video) => {
  			video._id = FRONT_BASE_URL+ 'video/id?id=' +video._id;
  			return video;
  		})
  	});
  }

  getVideos(params){
  	var vm = this;
  	const page= params.page || 0;
  	this.$http.get(BASE_URL+'videos?tag=lesbian&page='+page).then(function(result){
  		console.log(result);
  		vm.videos = result.data;
  		vm.videos = vm.videos.map((video) => {
  			video._id = FRONT_BASE_URL+ 'video/id?id=' +video._id;
  			return video;
  		})
  	});
  }
}
