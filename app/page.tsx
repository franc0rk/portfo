import Image from "next/image";
import AssetsList from "./components/assets/AssetsList";

export default function Home() {
  return (
    <div>
      <section>
        <AssetsList />
      </section>
    </div>
  );
}
