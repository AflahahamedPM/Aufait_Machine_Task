import AdminContentRouting from "./components/AdminContentRouting";
import Header from "./components/ResubaleComponents/Header";
import Sidebar from "./components/ResubaleComponents/Sidebar";

function App() {
  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <AdminContentRouting />
        </main>
      </div>
    </>
  );
}

export default App;
