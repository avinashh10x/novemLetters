import RecentLetter from "../component/RecentLetter"
import HomeScreenTools from "../component/HomeScreenTools"
import SearchBar from "../component/Searchbar"
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
import Dashboard from "../component/Dashboard"
import Divider from "../component/Divider"

function HomePage() {
  return (
    <div>
      {/* <SearchBar /> */}
      <HomeScreenTools />
      {/* divider */}
      <Divider />

      <Dashboard />

      <Divider />

      <RecentLetter />
    </div>
  )
}

export default HomePage
