export const imageUploader = (file,cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => (
        cb(reader.result)
    )
}
    
 