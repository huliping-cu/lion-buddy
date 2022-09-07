const imageForm = document.querySelector("#imageForm");
const imageInput = document.querySelector("#imageInput");

imageForm.addEventListener("submit", async event => {
  event.preventDefault();
  const file = imageInput.files[0]
  const region = "us-east-1"
  const bucketName = "project-userimg"
  const accessKeyId = 'AKIAXVBVVR3DBYJS3I4N'
  const secretAccessKey = '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'

  const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion:'v4'
  })

  let imageName = file['name']
  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires:60
  })

  const uploadURL = await s3.getSignedUrlPromise('putObject',params)
  console.log(uploadURL)
  await fetch(uploadURL,{
    method:"PUT",
    headers:{
        "Content-Type":"multipart/form-data"
    },
    body:file
  }).then(response => console.log(response))

})

