'use strict';

app.controller("SearchResultCtrl", function($scope, SearchFactory, Flash, $timeout) {

  $scope.isCollapsed = true;
  $scope.isCollapsedHorizontal = true;
  $scope.zz = {};

  $scope.item = SearchFactory.getItems();
  console.log("$scope.item", $scope.item);
  // console.log("$scope.pics", $scope.pics);
  //now we have  $scope.item
  //now we have  $scope.pics
  // $scope.pic = SearchFactory.getPics();
  // console.log("$scope.pic", $scope.pic);
  $scope.zz.make = $scope.item.make.name;
  $scope.zz.model = $scope.item.model.name;
  $scope.zz.year = $scope.item.year.year;
  $scope.zz.style = $scope.item.style.submodel.body;



  $scope.getPhoto = () => {
    // console.log("$scope.ZZZZ", $scope.zz);
    SearchFactory.getPicture($scope.zz)
    .then( (imgSearch) => {
      console.log("imgSearch", imgSearch);
      $scope.photo1.cool1 = "http://media.ed.edmunds-media.com" + imgSearch.photos[0].sources[0].link.href;
      $scope.photo1.cool2 = "http://media.ed.edmunds-media.com" + imgSearch.photos[1].sources[0].link.href;
      // console.log("TEST FOR photo1", $scope.photo1);
      // console.log("COOL1", imgSearch.photos[0].sources[0].link.href);

    });
  };

  $scope.photo1 = {
    cool1: "",
    cool2: ""
  };

  $scope.getPhoto();

  // console.log("$scope.photo1", $scope.photo1);
  // console.log("$scope.photo1.cool1", $scope.photo1.cool1);

  //////FLASH////////////
  //////FLASH////////////
  //////FLASH////////////

  $scope.success = function() {
    var message = '<strong>Well done!</strong> You successfully saved it to favorites.';
    Flash.create('success', message, 2000);
  };





  /////// //ADD TO FB //////////////////////////////////
  /////// //ADD TO FB //////////////////////////////////
  /////// //ADD TO FB //////////////////////////////////


  $scope.newSearch = {
    make: "",
    model: "",
    style: "",
    year: "",
    ratings: {
        performanceScore: "",
        performanceSummary: "",
        comfortScore: "",
        comfortSummary: "",
        interiorScore: "",
        interiorSummary: "",
        valueScore: "",
        valueSummary: "",
        funToDriveScore: "",
        funToDriveSummary: ""
      },
    summary: "",
    comment: "",
    cardId: SearchFactory.getCarId()

  };

  $scope.addToFb = (searchObj) => {
    $scope.success();
    // console.log("searchObj", searchObj);
    $scope.newSearch.make = searchObj.make.name;
    $scope.newSearch.model = searchObj.model.name;
    $scope.newSearch.style = searchObj.style.name;
    $scope.newSearch.year = searchObj.year.year;
    $scope.newSearch.ratings.performanceScore = searchObj.ratings[0].score;
    $scope.newSearch.ratings.performanceSummary = searchObj.ratings[0].summary;
    $scope.newSearch.ratings.comfortScore = searchObj.ratings[1].score;
    $scope.newSearch.ratings.comfortSummary = searchObj.ratings[1].summary;
    $scope.newSearch.ratings.interiorScore = searchObj.ratings[2].score;
    $scope.newSearch.ratings.interiorSummary = searchObj.ratings[2].summary;
    $scope.newSearch.ratings.valueScore = searchObj.ratings[3].score;
    $scope.newSearch.ratings.valueSummary = searchObj.ratings[3].summary;
    $scope.newSearch.ratings.funToDriveScore = searchObj.ratings[4].score;
    $scope.newSearch.ratings.funToDriveSummary = searchObj.ratings[4].summary;
    $scope.newSearch.summary = searchObj.summary;
    // console.log("newSearch", $scope.newSearch);
    SearchFactory.postSearchToFb($scope.newSearch)
    .then(
      (data) => console.log('search saved!', $scope.newSearch),
      (error) => console.log(error)
    );
  };


  ////////////CHART//////////////////
  ////////////CHART//////////////////
  ////////////CHART//////////////////

  $scope.myDataSource = {
    chart: {
        caption: "",
        subcaption: "",
        startingangle: "120",
        showlabels: "0",
        showlegend: "1",
        enablemultislicing: "0",
        slicingdistance: "15",
        showpercentvalues: "1",
        showpercentintooltip: "0",
        plottooltext: "$label Rating : $datavalue",
        theme: "fint",
        captionfontsize: "18",
        plottooltextfontsize: "18",
        valuefontsize: "16"
    },
    data: [
        {
            label: "Performance",
            value: ""
        },
        {
            label: "Comfort",
            value: ""
        },
        {
            label: "Interior",
            value: ""
        },
        {
            label: "Value",
            value: ""
        },
        {
            label: "FunToDrive",
            value: ""
        }
    ]
  };



  $scope.createChart = (searchObj) => {
    // console.log("am clicked", searchObj);
    $scope.myDataSource.chart.caption = searchObj.make.name;
    $scope.myDataSource.chart.subCaption = searchObj.model.name;
    $scope.myDataSource.data[0].value = searchObj.ratings[0].score;
    $scope.myDataSource.data[1].value = searchObj.ratings[1].score;
    $scope.myDataSource.data[2].value = searchObj.ratings[2].score;
    $scope.myDataSource.data[3].value = searchObj.ratings[3].score;
    $scope.myDataSource.data[4].value = searchObj.ratings[4].score;
    // console.log("CHART ITEM", $scope.myDataSource.chart.caption);
  };

   $scope.createChart($scope.item);


});