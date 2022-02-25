//@ts-nocheck
'use strict';
(function () {
    var map = L.map('map').setView([0, 0], 15);
    var icon = L.icon({
        iconUrl: '../images/icon-location.svg',
        iconSize: [35, 45],
        iconAnchor: [22, 24],
    });
    let marker;
    const toaster = (msg) => {
        // "linear-gradient(to right, #00b09b, #96c93d)"
        Toastify({
            text: msg,
            duration: 2000,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: red,
            },

        }).showToast();
    }

    const ipifyUrl = ` https://geo.ipify.org/api/v2/country,city?apiKey=at_OsQjckkptcAYzJfWmWEYx5G93dgzQ`
    const body = document.querySelector('body')
    const ipAddress = document.querySelector('.ip-address')
    const location = document.querySelector('.location')
    const timezoneInput = document.querySelector('.timezone')
    const ispInput = document.querySelector('.isp')
    const inputForm = document.querySelector('.input-tracker-form')


    // onloading of page show the user Ip
    window.addEventListener('load', async function (e) {
        const loadUrl = `${ipifyUrl}&ipAddress`
        // console.log(body)
        const { lat, lng } = await loadMap(loadUrl)
        marker = new L.marker([lat, lng], { icon })
        map.addLayer(marker)

    })

    inputForm.addEventListener('submit', async function (e) {
        e.preventDefault()
        let ipValue = document.querySelector('.input-tracker-text')?.value
        if (!ipValue) {
            Toastify({
                text: "Please enter the url",
                duration: 2000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #ff9966, #ff5e62)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                },

            }).showToast();
            return;
        } else if (!validUrl(ipValue)) {
            Toastify({
                text: "Please enter a valid url or ipAddress",
                duration: 2000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #f5af19, #f12711)",
                },

            }).showToast();
            return;
        }

        const newUrlOrIp = ipValue.replace(/(^\w+:|^)\/\//, '');
        const newIpifyUrl = `${ipifyUrl}&domain=${newUrlOrIp}`

        const { lat, lng } = await loadMap(newIpifyUrl)
        map.removeLayer(marker)
        marker = new L.marker([lat, lng], { icon })
        map.addLayer(marker)
        inputForm.reset()
    })

    //checking if url or ip is valid or not
    const validUrl = (url) => {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            //  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(url);
    }


    //calling ipify api and loadMap
    const loadMap = async (url) => {
        try {
            const result = await fetch(url)
            const data = await result.json();
            ipAddress.textContent = data.ip
            timezoneInput.textContent = 'UTC' + data.location.timezone
            ispInput.textContent = data.isp
            location.textContent = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`


            //setting the location
            map.setView([data.location.lat, data.location.lng], 15, {
                animate: true,
                duration: 0.5
            })
            //adding tiles using openweather map
            const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
            const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            const tiles = L.tileLayer(tileUrl, { attribution })
            tiles.addTo(map);

            //giving out lat and long coordinates to use elsewhere
            return { lat: data.location.lat, lng: data.location.lng }
        } catch (error) {
            Toastify({
                text: "Error: Please try again in some time",
                duration: 2000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #e43a15, #e65245)",
                },

            }).showToast();
            return;
        }

    }
})()
