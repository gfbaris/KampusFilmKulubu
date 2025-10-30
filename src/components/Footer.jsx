// src/components/Footer.jsx

function Footer({ isim }) {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} {isim} | Web Teknolojileri ve Programlama Ödevi</p>
    </footer>
  );
}

export default Footer;