import QRCodeScanner from "./Pages/scanner";
import Navbar from "./components/header"

export default function Home(){
  return(
    <div>
      <Navbar/>
      <QRCodeScanner/>
    </div>
  )
}