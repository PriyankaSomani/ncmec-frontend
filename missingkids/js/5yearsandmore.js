(function ($, Handlebars) {

    var _this, yearsandmoreMod = {
        el: {
            siteSearchResults: $("#missing-anniversary-grid"),
            siteSearchResultsWrapper: $("#missing-anniversary-grid-wrapper"),
            timeframeRadio: $('[name=timeframe]')
        },
        templates: {
            searchItem: Handlebars.compile($("#tmpl-anniversary-grid-item").html())
        },
        init: function () {
            _this = this;
            _this.initHandlebarsRegisters();
            _this.el.timeframeRadio.change(_this.performSearch);
            _this.performSearch();
            $(window).scroll(_this.onScroll);
        },
        performSearch: function (e) {
            if (e) {
                e.preventDefault();
            }
            _this.el.siteSearchResultsWrapper.find('.ajax-loader').show();

            $.get('./missingkids/js/json/5yearsandmore.json', {timeframe: _this.el.timeframeRadio.val()}, function (data) {
                var html = _this.templates.searchItem(data);
                _this.el.siteSearchResults.empty().html(html);
                _this.el.siteSearchResultsWrapper.find('.ajax-loader').hide();
            });
        },
        onScroll: function () {
            
            var difference = Math.abs(parseInt($(window).scrollTop() + $(window).height())- parseInt($(document).height()))
            if (difference < 5) {

                _this.el.siteSearchResultsWrapper.find('.ajax-loader').show();
                $.get('./missingkids/js/json/5yearsandmore.json', {timeframe: _this.el.timeframeRadio.val()}, function (data) {
                    var html = _this.templates.searchItem(data);
                    _this.el.siteSearchResults.append(html);
                    _this.el.siteSearchResultsWrapper.find('.ajax-loader').hide();
                });

            }
        },
        initHandlebarsRegisters:function(){
            Handlebars.registerHelper('captilize', function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
                
            });
        }
    };

    yearsandmoreMod.init();



})(jQuery, Handlebars);