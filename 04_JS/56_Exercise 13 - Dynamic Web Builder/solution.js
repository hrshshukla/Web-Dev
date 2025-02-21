// there could be another version of this answer :
// -- like we can target the elements by there class and chnge the [innerText] inside them  

function DynamicWebBuilder(videoNumber, title, ChannelName, Views, TimeOld, duration, thumbnail ) {
    var finalViews

    Views<1000? finalViews=Views :  Views<1000000? finalViews = Views/1000 + "K" :  finalViews= Views/1000000 + "M";

    var html = `<div class="card">
        <div class="numBOX">${videoNumber}</div>
        <div class="thumbnail">
            <img src="${thumbnail}" alt="nothing">
            <span class="duration">${duration}</span>
        </div>
        <div class="text">
            <div class="title">${title}</div>
            <div class="detail">
                <span class="channelName">${ChannelName}</span> &bull;
                <span class="views">${finalViews} views</span>  &bull;
                <span class="Time">${TimeOld} year ago</span>
            </div>
        </div>
    </div>`
    
    document.body.innerHTML += html
}

DynamicWebBuilder(69, "80,00,000 Views Calculated | Sigma Web Development Course - Tutorial #67",
    "CodeWithHarry",  8000000, 1, "18:56", "solution.png"
)
