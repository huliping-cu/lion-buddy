function saveRatingButton(item, businessId, email, buttonClicked){
    let today = new Date()
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    $(item).addClass("toggled")

    fetch('https://tvtjejztv0.execute-api.us-east-1.amazonaws.com/v2/comment_restaurant', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'business_id': businessId,
        'date_liked': date,
        'email': email,
        'user_feeling': buttonClicked
    }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


$(document).ready(function(){

        const uploadURL = 'https://tvtjejztv0.execute-api.us-east-1.amazonaws.com/v2/restaurant/' + cuisine
        console.log(uploadURL)
        let restnum = 40
        fetch(uploadURL, {
            method: "GET",
            headers:{
                'numrest': restnum.toString()
            }
            }).then(response => response.json()
            ).then((responseData)=>{
                console.log(responseData)
                for (let i = 0; i < responseData.length; i++) {
                    // Define returned values
                    let businessId = responseData[i]['business_id']
                    let name = responseData[i]['name']
                    let address = responseData[i]['address']
                    let rating = parseFloat(responseData[i]['rating'])
                    let reviewCount = responseData[i]['review_count']
                    let imageUrl = responseData[i]['image_url']
                    let restaurantUrl = responseData[i]['restaurant_url']
                    let phone = responseData[i]['phone']
                    
                    let cont = $('<div class="col-md-6 restaurant-cont-style">')
                    cont.append('<div class="img-wrapper"><a target="_blank" href="' + restaurantUrl + '"><img class="img-fluid" src="' + imageUrl + '"></a></div>')
                    cont.append('<span class="restaurant-name-style">' + name + '</span>' + '<br>' + address + '<br>' + phone + '<br>')
                    cont.append('<span class="review-style">' + reviewCount + ' </span>')

                    if (rating % 1 == 0){
                        let left = 5 - rating
                        for (let j = 1; j <= rating; j++) {
                            cont.append('<span class="fa fa-star checked">')
                        }
                        for (let k = 1; k <= left; k++) {
                            cont.append('<span class="fa fa-star">')
                        }
                    }
                    else {
                        let left = 5 - rating
                        for (let j = 1; j < rating; j++) {
                            cont.append('<span class="fa fa-star checked">')
                        }
                        cont.append('<span class="fa fa-star-half-full checked">')
                        for (let k = 1; k < left; k++) {
                            cont.append('<span class="fa fa-star">')
                        }
                    }

                    cont.append('<br><span class="rate-text">Like or Dislike Restaurant</span> <i onclick="saveRatingButton(this,' + "'" + businessId + "'," + "'" + sessionData['email'] + "'," + "'" + 'like' + "'" + ')" class="fa fa-thumbs-up"></i> <i onclick="saveRatingButton(this,' + "'" + businessId + "'," + "'" + sessionData['email'] + "'," + "'" + 'like' + "'" + ')" class="fa fa-thumbs-down"></i>')

                    $("#restaurant-results").append(cont)
                    }
            })
})