function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  }


$(document).ready(function(){

    //get user input from google login
    let email = data["email"]
    let firstName = data["firstName"]
    let lastName = data["lastName"]
    let googlePictureurl = data["picture"]

    let checkUrl = 'https://tvtjejztv0.execute-api.us-east-1.amazonaws.com/v2/users/getuser?email=' + email
        fetch(checkUrl)
            .then(response => {
                // console.log("response.json(): ",response.json())
                return response.json();
            })
            .then(user => {
                $("#profile_pic").attr("src", user['img_url']);
                $("#inputAge").val(user['age']);
                $("#inputPhoneNumber").val(user['phoneNumber']);
                $("#inputGender").val(user['gender']);
                $("#inputHobbies").val(user['hobby']);
                $("#inputMajor").val(user['major']);
                $("#inputNationality").val(user['nationality']);
                $("#inputDegree").val(user['degree']);
                $("#inputGraduatingYear").val(user['graduating_year']);

                $("#preferredGender").val(user['prefer_gender']);
                $("#inputCuisine").val(user['cuisine']);
            })
            .catch(function(){
                $("#profile_pic").attr("src", googlePictureurl);
            })

        
    
    $("#inputEmail").val(email)
    $("#inputFirstName").val(firstName)
    $("#inputLastName").val(lastName)



    //show img in frontend
    function readURL(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();    
            reader.onload = function (e) {
                $('#profile_pic').attr('src', e.target.result);
            }    
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInput").change(function(){
        readURL(this);
    });

    
    $("#save_button").click(function(event){
        console.log("clicked save button")
        event.preventDefault();

        //get user input
        let firstName = $("#inputFirstName").val().trim()
        let lastName = $("#inputLastName").val().trim()
        let phoneNumber = $("#inputPhoneNumber").val().trim()
        let gender = $("#inputGender").val().trim()
        let age = $("#inputAge").val().trim()
        let hobbies = $("#inputHobbies").val().trim()
        let nationality = $("#inputNationality").val().trim()
        let degree = $("#inputDegree").val().trim()
        
        let major = $("#inputMajor").val().trim()
        let preferredCuisine = $("#inputCuisine").val().trim()
        let graduatingYear = $("#inputGraduatingYear").val().trim()
        let genderPreference = $("#preferredGender").val().trim()


        //uploading user profile picture
        let files = $("#imgInput")[0].files;
        let file = files[0];

        let region = "us-east-1"
        let bucketName = "project-userimg"
        let accessKeyId = 'AKIAXVBVVR3DBYJS3I4N'
        let secretAccessKey = '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'

        if (typeof(file) != 'undefined') {

            let s3 = new AWS.S3({
                region,
                accessKeyId,
                secretAccessKey,
                signatureVersion:'v4'
              })

            let imageName = email + "." + file.type.split("/")[1]

            let params = ({
            Bucket: bucketName,
            Key: imageName,
            Expires:60
            })
            
            let uploadURL = s3.getSignedUrl('putObject',params)
            console.log(uploadURL)

            fetch(uploadURL,{
                method:"PUT",
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                body:file
              }).then(response => console.log(response))
        }


        //locate user
        let url = 'https://tvtjejztv0.execute-api.us-east-1.amazonaws.com/v2/users/getuser?email=' + email
        fetch(url)
            .then(response => {
                return response.json();
            })
            //if user in database
            .then(user => {

                // if user uploads new photo
                if (typeof(file) != 'undefined') {
                    let userInfo = {
                        "firstName" : firstName,
                        "lastName":lastName,
                        "email":email,
                        "phoneNumber":phoneNumber,
                        "gender":gender,
                        "age":age,
                        "hobbies":hobbies,
                        "nationality":nationality,
                        "degree":degree,
                        "major":major,
                        "preferredCuisine":preferredCuisine,
                        "graduatingYear":graduatingYear,
                        "gender" :gender,
                        "genderPreference":genderPreference,
                        "imgUrl": 'https://project-userimg.s3.amazonaws.com/' + email + "." + file.type.split("/")[1] //use new photo
                    }
                    console.log("userInfo: ",userInfo)

                    const data = userInfo;
                    fetch('https://tvtjejztv0.execute-api.us-east-1.amazonaws.com/v2/users/updateuser', {
                    method: 'PUT', //upload new photo
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                    })
                    .then(response => response.json())
                    .then(data => {
                    console.log('Success:', data);
                    })
                    .catch((error) => {
                    console.error('Error:', error);
                    });
                }
                else { // if user doesn't upload new photo
                    let userInfo = {
                        "firstName" : firstName,
                        "lastName":lastName,
                        "email":email,
                        "phoneNumber":phoneNumber,
                        "gender":gender,
                        "age":age,
                        "hobbies":hobbies,
                        "nationality":nationality,
                        "degree":degree,
                        "major":major,
                        "preferredCuisine":preferredCuisine,
                        "graduatingYear":graduatingYear,
                        "gender" :gender,
                        "genderPreference":genderPreference,
                        "imgUrl": user['img_url'] // use database photo
                    }
                    console.log("userInfo: ",userInfo)

                    const data = userInfo;
                    fetch('https://tvtjejztv0.execute-api.us-east-1.amazonaws.com/v2/users/updateuser', {
                    method: 'PUT', //upload new photo
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                    })
                    .then(response => response.json())
                    .then(data => {
                    console.log('Success:', data);
                    })
                    .catch((error) => {
                    console.error('Error:', error);
                    });
                }
            })
            .catch(function() { //if user not in database
                console.log("USER DOES NOT PREVIOUSLY EXIST")
                //if user uploads new photo
                if (typeof(file) != 'undefined') {
                    let userInfo = {
                        "firstName" : firstName,
                        "lastName":lastName,
                        "email":email,
                        "phoneNumber":phoneNumber,
                        "gender":gender,
                        "age":age,
                        "hobbies":hobbies,
                        "nationality":nationality,
                        "degree":degree,
                        "major":major,
                        "preferredCuisine":preferredCuisine,
                        "graduatingYear":graduatingYear,
                        "gender" :gender,
                        "genderPreference":genderPreference,
                        "imgUrl": 'https://project-userimg.s3.amazonaws.com/' + email + "." + file.type.split("/")[1]
                    }
                    console.log("userInfo: ",userInfo)

                    const data = userInfo;
                    fetch('https://tvtjejztv0.execute-api.us-east-1.amazonaws.com/v2/users/updateuser', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                    })
                    .then(response => response.json())
                    .then(data => {
                    console.log('Success:', data);
                    })
                    .catch((error) => {
                    console.error('Error:', error);
                    });
                }
                else {
                    //if user doesn't uploads new photo
                    let userInfo = {
                        "firstName" : firstName,
                        "lastName":lastName,
                        "email":email,
                        "phoneNumber":phoneNumber,
                        "gender":gender,
                        "age":age,
                        "hobbies":hobbies,
                        "nationality":nationality,
                        "degree":degree,
                        "major":major,
                        "preferredCuisine":preferredCuisine,
                        "graduatingYear":graduatingYear,
                        "gender" :gender,
                        "genderPreference":genderPreference,
                        "imgUrl": googlePictureurl //use google photo
                    }
                    console.log("userInfo: ",userInfo)
    
                    const data = userInfo;
                    fetch('https://tvtjejztv0.execute-api.us-east-1.amazonaws.com/v2/users/updateuser', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                    })
                    .then(response => response.json())
                    .then(data => {
                    console.log('Success:', data);
                    })
                    .catch((error) => {
                    console.error('Error:', error);
                    });

                }
                
            })

    })


    


    $("#remove_button").click(function(event){
        console.log("remove button clicked")
        $("#profile_pic").attr("src", googlePictureurl);
        $("#nav_pic").attr("src", googlePictureurl);

    })
})
