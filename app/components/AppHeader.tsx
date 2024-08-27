import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="flex p-8 border-b">
      <div className="flex-1">EnchaiLearn</div>
      <nav>
        <ul className="flex">
          <li>
            <Link href={"/courses"}>Courses</Link>
          </li>
          <li>
            <Link href={"/dashboard"}>User</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
