// feedreader.js

$(function() {
    //covers the RSS feed function
    describe('RSS Feeds', function() {
        //checks that allFeeds is defined
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //checks that all feeds have a url
        it('each feed in allFeeds has a defined URL', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toContain('http://','https://');
            }
        });

        //checks that all feed pulls have a name
         it('each feed in allFeeds has a name', function(){
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
                expect(feed.name).not.toBe(null);
            }
         });
    });


    describe('The menu', function() {

        //tests that the menu is hidden when the page is first loaded
        it('menu hidden by default', function() {
            const htmlBody = document.getElementsByTagName('body')[0];
            expect(htmlBody.classList.contains('menu-hidden')).toBe(true);
        });

        //tests that the menu button works as intended
        it('menu icon works (open and close)', function() {
            const menuButton = document.getElementsByClassName('menu-icon-link')[0];
            const htmlBody = document.getElementsByTagName('body')[0];
            menuButton.click();
            expect(htmlBody.classList.contains('menu-hidden')).toBe(false);
            menuButton.click();
            expect(htmlBody.classList.contains('menu-hidden')).toBe(true);
        });
    });

    //covers the loadFeed function
    describe('Initial Entries', function() {
        beforeEach(function(done){
            loadFeed(0, done);
        });

        //checks loadFeed is correctly called and functions
        it('loadFeed is called and completed', function() {
            const feed = document.getElementsByClassName('feed')[0];
            let entries = feed.getElementsByClassName('entry');
            expect(entries.length).toBeGreaterThan(0);
        });
    });

    //Tests to ensure content changes when a new feed is loaded
    describe('New Feed Selection', function() {
        let feed = document.querySelector('div.feed');
        let child1;
        let child2;
        beforeEach(function(done){
            loadFeed(0, function() {
                child1 = feed.innerHTML;
                loadFeed(1, function(){
                    child2 = feed.innerHTML;
                    done();
                });
            });
        });

        it('loadFeed changes content on new feed', function() {
            expect(child1 == child2).toBe(false);
        });
    });  
}());
