$(document).ready(() => {

    const  $loading = $('#loading').hide();
    $(document)
      .ajaxStart(function () {
        $loading.show();
      })
      .ajaxStop(function () {
        $loading.hide();
      });


    const key = '101cbc4ce894457c9d1791b6b8050bfb'
    const headlineUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`;

    const displaySearchResults = (url) => {
        $('#articles').empty();
        const articles = $.getJSON(url,  (data) => { appendResults(data); });
    }

    const appendResults = (data) => {
        const articles = data.articles;
        $.each(articles, (index, article) => { appendFormattedArticle(article) });
    }

    const appendFormattedArticle = (article) => {
        const {
            content,
            title,
            url,
            urlToImage,
        } = article;
        if (content && title && url && urlToImage) {
            $(formatArticle(article)).appendTo('#articles');
        }
    }

    const formatArticle = (article) => {
        const {
            content,
            title,
            url,
            urlToImage,
        } = article;
        const truncatedContent = content? content.substring(0, 250): '';
        const formattedArticle = `<div class="article">
                                    <img class="article-image" src="${urlToImage}" alt="" /><img>
                                    <div class="article-container">
                                        <h2 class="article-title">${title}</h2>
                                        <p class="article-content">${truncatedContent}</p>
                                        <a class="article-button" href="${url}">Read More</a>
                                    </div>
                                </div>`;
        return formattedArticle;
    }

    displaySearchResults(headlineUrl);

    $('#search-form').submit((event) => {
        const searchTerm = event.target[0].value;
        const sortBy = event.target[1].value;
        const searchUrl = `https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=${sortBy}&apiKey=${key}`;
        displaySearchResults(searchUrl);
        event.preventDefault();
    });
});
