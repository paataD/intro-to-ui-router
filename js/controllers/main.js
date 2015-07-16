
app.controller('MainCtrl', function($scope, posts){
	$scope.posts = posts;
});

app.controller('PostCtrl', function($scope, post, $state){
	$scope.post = post;

	$scope.goBack = function(){
		$state.go('home');
	};
});
