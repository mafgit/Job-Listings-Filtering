$('.filters').hide();
var filterTags = [];
fetch('./data.json')
    .then(res => res.json())
    .then(function (data) { refreshList(data) })
function refreshList(data) {
    $('#jobs').empty()
    $.each(data, function (i, val) {
        var tags = [];
        var output = '';

        tags.push(val.role);
        tags.push(val.level);
        for (let i of val.tools) {
            tags.push(i)
        }
        for (let i of val.languages) {
            tags.push(i)
        }

        for (let i of tags) {
            output += `<p class="tag">${i}</p>`;
        }
        var showJob = "grid";
        if (filterTags.length > 0) {
            for (let i of filterTags) {
                if (tags.includes(i) === false) {
                    showJob = "none";
                }
            }
        }
        else {
            showJob = "grid";
        }
        var displayFeatured = val.featured ? "block" : "none";
        var displayNew = val.new ? "block" : "none";
        var featuredJob = val.featured ? "featuredJob" : "";


        $(`<div class="job ${featuredJob}" style="display:${showJob}">
            <div class="logodiv">
                <img src="${val.logo}" alt="" class="logo">
            </div>
            <div class="details">
            <div class="upper">
                <p class="company">${val.company}</p>
                <p class="new" style="display:${displayNew}">NEW!</p>
                <p class="featured" style="display:${displayFeatured}">FEATURED</p>
            </div>
            <div class="middle">
                <h1 class="position">${val.position}</h1>
            </div>
            <div class="lower">
                <p class="postedAt">${val.postedAt}</p>
                <p>.</p>
                <p class="contract">${val.contract}</p>
                <p>.</p>
                <p class="location">${val.location}</p>
            </div>
            <hr>
            </div>
            <div class="tags">
                ${output}
            </div>
            </div>`).appendTo($('#jobs'));
    })

    $('.tag').click(function () {
        if (filterTags.includes(this.innerText) === false && filterTags.length < 3) {
            filterTags.push(this.innerText);
            $('.filtertags').append(`<div class="filter-tag"><p>${this.innerText}</p><button>x</button></div>`)
        }
        $('.clear').click(function () {
            $('.filters').empty();
            $('.filters').append('<div class="filtertags"></div');
            $('.filters').append('<div class="cleardiv"><button class="clear">Clear</button></div>')
            filterTags = [];
            refreshList(data)
            hideFilterDiv();
        })
        $('.filter-tag button').click(function () {

            filterTags = filterTags.filter(filtertag => filtertag != this.parentNode.firstChild.innerText)
            this.parentNode.remove();
            refreshList(data);
            hideFilterDiv()
        })
        refreshList(data);
        hideFilterDiv()
    })

}

function hideFilterDiv() {
    if ($('.filtertags').children().length > 0) {
        $('.filters').show();
    }
    else {
        $('.filters').hide();
    }
}