import LicenceManagement from "./components/LicenceManagement";

export default function App() {
  return (
    <div>
      <header className="p-4 border-b shadow-orange-900 flex gap-20 justify-between items-center h-16">
        <img
          src="https://inspeq.ai/hubfs/transparent%20logo.png"
          className="w-32"
        />
        <h2 className=" text-lg">Licence Management</h2>
      </header>
      <LicenceManagement />
    </div>
  );
}
