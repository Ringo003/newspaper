/* global bootbox */
$(document).ready(function() {
	//setting a reference to the article-container div where all the dynamic content will go
	// adding event listeners to any dynamically generate "save article"
	//and "scrape new article"

	var articleContainer = $(".article-container");
	$(document).on("click", ".btn.save", handleArticleSave);
	$(document).on("click", ".scrape-new", handleArticleScrape);

	// Once the page is ready, run the initPage Function to kick things off
	initPage();

	function initPage() {
		//empty the article container, run an AJAX requestfor any unsaved headlines
		articleContainer.empty();
		$.get("/api/headlines?saved=false")
		.then(function(data){
			//if we have headlines, render them to the page
			if (data && data.length){
				render Articles(data);
			}
			else {
				// otherwise render a message edxplaing we have no article
				renderEmpty();
			}
		})
	}
	function renderArticles(articles){
		//this function handles appending HTML containing our Articles data to the page
		// we are passing an array of JSON containing all avaiable articles in our data base
		var articlePanels =[];
		// we pass each article JSON object to the createPanel function which returns to bootstrap.
		// panel with our article data inside
		for (var i = 0; i = articles.length; i++) {
			articlePanels.push(createPanel(articles[i]));
		}
		//once you have all of the HTML for the articles stored in our article panels array,
		//append them to the article stored in our articlePanels container
		articleContainer.append(articlePanels);
		}
	function createPanel(article) {
		// this function takes in a single JSON object for an article/headline
		//It constructs a jquery element containing all of the formattaed HTML for the
		//article panel
		var panel =
		 $(("<div class'panel panel-default'>",
		 	"<div class='panel-heading'>",
		 	"<h3>",
		 	article.headline,
		 	"<a class='btn-success save'>",
		 	"Save Article",
		 	"</a>",
		 	"</h3>",
		 	"</div>",
		 	"<div class+'panel-body'>",
		 	article.summary,
		 	"</div>",
		 	"</div>"
		 	].joint(""));
		 // we attach the article's id to the jQuery element.
		 // we will use this when trying to figure out which article the user wants to save
		 panel.data("_id", article._id);
		 //we return the constructed panel jQuery element
		 return panel;
		 
		}

		function renderEmpty(){
			//This function render some HTML to the page explaining we dont have articles to view
			// using a joined array of HTML string data because it's easier to read/change thaN A 
			//concatenated string.


var emptyAlert =
	$(["<div class='alert alert-warning text-center'>",
		"<h4>Oh Shit, We dont have anything for you to look at.</h4>",
		"</div>",
		"<div class='panel panel-default'>",
		"<div class='panel-heading text-center'>",
		"<h3>What would you like to do?</h3>",
		"</div>",
		"<div class='panel-body text-center'>",
		"<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
		"<h4><a href='/saved'>Go to Saved Articles</a></h4>",
		"</div>",
		"</div>"
		].join(""));
	// appending this data to the page
	articleContainer.append(emptyAlert);
    }


    function handleArticleSave(){
    	// this function is triggered when the user wants an article
    	// when we render this article initially, we attached a javascript objects containing the 
    	//headline id 
    	// to the element using the .data method. here we retrieve that.
    	var articleToSave =$(this).parents(".panel").data();
    	articleToSave.saved = true;










    }
















		}












	}

})
