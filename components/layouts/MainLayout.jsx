import Navbar from '../Navbar'

const MainLayout = ({ children }) => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(background.svg)` }}
    >
      <Navbar />
      <main className=" container mx-auto">{children}</main>
    </div>
  )
}

export default MainLayout
