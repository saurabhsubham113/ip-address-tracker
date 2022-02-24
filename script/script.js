// @ts-nocheck
(function () {
    const inputValue = document.querySelector('input-tracker-text')?.value
   
    const validUrl = (url) => {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(url);
    }
    console.log(validUrl('8.8.8.8:5000'))
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_CvRNNZUw4dVK1v4egVUruazZHFrNa&domain=${'184.72.19.87'}`
    fetch(url).then(res => res.json()).then(data => console.log(data))
    var map = L.map('map').setView([0, 0], 1);
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution })
    tiles.addTo(map);
})()
