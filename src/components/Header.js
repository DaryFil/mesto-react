import headerLogo from "../images/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img alt="Логотип место" src={headerLogo} className="header__logo" />
    </header>
  );
}
