function displayUser(user){
    let image_cont = $('<div class="col-md-4 image-cont-style">')
    let detail_cont = $('<div class="col-md-8 request-cont-style">')

    // Get data out of response
    let image_url = user['img_url']
    let email = user['email']
    let phone_number = user['phoneNumber']
    let gender = user['gender']
    let first_name = user['firstname']
    let last_name = user['lastname']
    let age = user['age']
    let cuisine = user['cuisine']
    let graduating_year = user['graduating_year']
    let degree = user['degree']
    let hobby = user['hobby']
    let major = user['major']
    let nationality = user['nationality']

    // Format and display matched user
    let image = $('<img src="' + image_url + '" class="img-fluid">')
    image_cont.append(image)

    let name_cont = $('<div class="user-name-style">')
    name_cont.html(first_name + ' ' + last_name)
    detail_cont.append(name_cont)

    detail_cont.append('<b>' + degree.charAt(0).toUpperCase() + degree.slice(1) + ' in ' + major + '</b><br>')
    detail_cont.append('<b>Class of ' + graduating_year + '</b><br>')
    detail_cont.append(age + ' Year\'s old<br>')
    detail_cont.append('Self Identify As: <b>' + gender.charAt(0).toUpperCase() + gender.slice(1) + '</b><br>')
    detail_cont.append('Nationality: <b>' + nationality.charAt(0).toUpperCase() + nationality.slice(1) + '</b><br>')
    detail_cont.append('Hobbies: <b>' + hobby.charAt(0).toUpperCase() + hobby.slice(1) + '</b><br>')
    detail_cont.append('Preferred Cuisine: <b>' + cuisine.charAt(0).toUpperCase() + cuisine.slice(1) + '</b><br>')
    detail_cont.append('Email: <b>' + email + '</b><br>')
    detail_cont.append('Phone Number: <b>' + phone_number + '</b><br>')
    

    $("#matched-users").append(image_cont)
    $("#matched-users").append(detail_cont)

}

function displayRestaurants(cuisine){
    const restaurantUrl = 'https://tvtjejztv0.execute-api.us-east-1.amazonaws.com/v2/restaurant/' + cuisine.toLowerCase()
    let restnum = 4
    fetch(restaurantUrl, {
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

            $("#recommended-restaurants").append(cont)
            }
        })
}


$(document).ready(function(){
    $("#title-header").empty()
    $("#matched-users").empty()

    $("#title-header").html('Requested User')
    
    // Format title
    let url = 'https://tvtjejztv0.execute-api.us-east-1.amazonaws.com/v2/users/getuser?email=' + requester_email
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(user => {
            // Find requested user and display them on the screen for the receiver to approve
            displayUser(user)
            displayRestaurants(user['cuisine'])
        })

    $("#yes_button").click(function(event){
        let url = 'https://tvtjejztv0.execute-api.us-east-1.amazonaws.com/v2/users/getuser?email=' + requester_email
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(user => {
                // Find details about the requester
                let recipientemail = requester_email
                let recipientname = user['firstname'] + ' ' + user['lastname']
                let sourceemail = receiver_email
                let sourcename=  receiver_name
                let emailbody = 'Hi ' + recipientname + ',\n\nI\'d love to go join you for this meal, I will text you at ' + user['phoneNumber'] + ' to coordinate a good time and date!\n\nLooking forward to the meal!'
                const uploadURL = 'https://tvtjejztv0.execute-api.us-east-1.amazonaws.com/v2/respemail'
                console.log(uploadURL)

                    fetch(uploadURL, {
                        method: "POST",
                        headers:{
                            'recipientemail':recipientemail,
                            'recipientname':recipientname, 
                            'sourceemail':sourceemail, 
                            'sourcename':sourcename
                        },
                        body:emailbody
                        })
                        .then(response => response.json()
                        ).then((responseData)=>{
                            console.log(responseData)
                    })
            })

    })

})

