export const fileUpload = async file => {
  if (!file) throw new Error('File does not exist')
  const cloudURL = import.meta.env.VITE_CN_URL
  const uploadPreset = import.meta.env.VITE_CN_UPLOAD_PRESET

  const formData = new FormData()
  formData.append('upload_preset', uploadPreset)
  formData.append('file', file)

  try {
    const resp = await fetch(cloudURL, {
      method: 'POST',
      body: formData,
    })

    if (!resp.ok) throw new Error('Unable to upload the image')
    const cloudResp = await resp.json()

    return cloudResp.secure_url
  } catch (e) {
    console.log(e)
    throw new Error(e.message)
  }
}
