import Link from "next/link";


export default function Home() {
  return (
    <div className="text-center">
    <h1 className="text-3xl font-bold mb-4">Weather App</h1>
    <Link href="/weather">
      <button className="bg-blue-500 text-white p-2">Check Weather</button>
    </Link>
  </div>
        
  );
}
