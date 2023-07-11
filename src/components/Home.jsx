import { useState } from "react"
import exampleImage from "../assets/example.png"

const Home = () => {
  const [URL, setURL] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    const regex = /^https:\/\/(\w+)\.wordpress\.com\/(.*)$/
    if (!regex.test(URL)) {
      setErrorMessage("Vui lòng nhập link Wordpress.")
      return
    }
    
    setIsLoading(true)
    const response = await fetch("https://wordpress-downloader-server.onrender.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: URL })
    })

    if (response.status === 500)
      setErrorMessage("Lỗi: Không thể tải truyện.")
    else if (response.ok) {
      const blob = await response.blob()
      const downloadURL = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = downloadURL
      link.download = "output.epub"
      link.click()
      window.URL.revokeObjectURL(downloadURL)
    }

    setIsLoading(false)
  }

  return (
    <>
      <div className="container">
        <div className="description">
          <h1 className="title">Chuyển đổi truyện trên <span>Wordpress</span> thành file <span>EPUB</span></h1>
          <label htmlFor="inputURL">Nhập URL của truyện:</label>
          <input id="inputURL" type="text" value={URL} onChange={e => setURL(e.target.value)} placeholder="https://ten-mien.wordpress.com/ten-truyen/" />
          <button onClick={handleSubmit}>Tải xuống</button>
          {isLoading && <p>Đang tải...</p>}
          <p className="error-message">{errorMessage}</p>
        </div>
        <div className="example">
          <p className="note">Lưu ý: URL phải có phần Mục Lục chứa các đường link dẫn đến các chương truyện như hình dưới.</p>
          <img src={exampleImage} />
        </div>
      </div>
      <div className="link">
        <a href="https://github.com/Blankssssss" target="_blank" rel="noopener noreferrer">Made by Blank 💗</a>
      </div>
    </>
  )
}

export default Home