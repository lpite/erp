import { Link } from "wouter";

export function NavBar() {
  return (
    <nav>
      <ul className="flex gap-2 border-b">
        <li>
          <Link href="/">Товари</Link>
        </li>
        <li>
          <Link href="/list/income-document">Документи надходження</Link>
        </li>
        <li>
          <Link href="/list/sales-document">Документи продажу</Link>
        </li>
        <li>
          <Link href="#">Ціни</Link>
        </li>
        <li>
          <Link href="/reports/">Звіти</Link>
        </li>
      </ul>
    </nav>
  );
}
