function sendEmail(emailDiv, recipientEmail, recipientName, sourceEmail, sourceName){
    let emailBody = 'Hi ' + recipientName + ',\n\nYou\'ve received an invitation from ' + sourceName + ' to have a meal together.\n\nPlease navigate to the following link to accept or decline the invitation:\nhttp://127.0.0.1:5000/request/' + sourceEmail
    const emailUrl = 'https://tvtjejztv0.execute-api.us-east-1.amazonaws.com/v2/respemail'

    fetch(emailUrl, {
        method: "POST",
        headers:{
            'recipientemail': recipientEmail,
            'recipientname': recipientName, 
            'sourceemail': sourceEmail, 
            'sourcename': sourceName
        },
        body: emailBody
        })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData)
    })
}


function displayMatches(sourceEmail, sourceName, value){
    let image_cont = $('<div class="col-md-3 image-cont-style">')
    let blank_cont = $('<div class="col-md-1">')
    let detail_cont = $('<div class="col-md-8 matched-cont-style">')

    // Get data out of response
    let image_url = value['img_url']
    let email = value['email']
    let gender = value['gender']
    let first_name = value['firstname']
    let last_name = value['lastname']
    let age = value['age']
    let cuisine = value['cuisine']
    let graduating_year = value['graduating_year']
    let degree = value['degree']
    let hobby = value['hobby']
    let major = value['major']
    let nationality = value['nationality']

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
    
    let uniqueId = email.split("@")[0]
    let uniqueIdFormatted = "#" + uniqueId

    let recipientEmail = email
    let recipientName = first_name + ' ' + last_name

    let emailButton = '<button class="email-button" id="' + uniqueId + '" onclick="sendEmail(this,' + "'" + recipientEmail + "','" + recipientName + "','"  + sourceEmail + "','"  + sourceName + "'" + ')">Send an email to ' + first_name + ' to pair up</button>'
    console.log(emailButton)
    detail_cont.append(emailButton)

    $("#matched-users").append(image_cont)
    $("#matched-users").append(blank_cont)
    $("#matched-users").append(detail_cont)
}


$(document).ready(function(){
    $("#title-header").empty()
    $("#matched-users").empty()
    
    // Format title
    let userUrl = 'https://tvtjejztv0.execute-api.us-east-1.amazonaws.com/v2/users/getuser?email=' + email
    fetch(userUrl)
        .then(response => {
            return response.json();
        })
        .then(user => {
            $("#title-header").html('Meal Buddies Found For ' + user['firstname'])
            let sourceName = user['firstname'] + ' ' + user['lastname']

            // Find matched users and display them on the screen
            let matchUrl = 'https://tvtjejztv0.execute-api.us-east-1.amazonaws.com/v2/users/matchuser?email=' + email
            fetch(matchUrl)
                .then(response => {
                    return response.json();
                })
                .then(matched => {
                    $.each(matched, function(_, value){
                        displayMatches(email, sourceName, value)
                })
            })
        })

})