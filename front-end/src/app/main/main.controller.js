var BASE_URL = "http://localhost:5000/api/";
export class MainController {
  constructor ($http) {
    'ngInject';
    this.$http = $http;
    this.getVideos();
  }

  getSearch(){
  	var vm = this;
  	console.log(this.searchText);
  	this.$http.get(BASE_URL+ 'videos/search?tag='+this.searchText).then(function(result){
  		vm.videos = result.data;
  		vm.videos = vm.videos.map((video) => {
  			video._id = "http://localhost:3000/#/"+ 'video/id?id=' +video._id;
  			return video;
  		})
  	});
  }

  getVideos(){
  	var vm = this;
  	this.$http.get(BASE_URL+'videos?tag=lesbian').then(function(result){
  		console.log(result);
  		vm.videos = result.data;
  		vm.videos = vm.videos.map((video) => {
  			video._id = "http://localhost:3000/#/"+ 'video/id?id=' +video._id;
  			return video;
  		})
  	});
  }
}
